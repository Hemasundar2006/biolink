import { Router } from 'express';
import { Template } from '../models/Template.js';
import { User } from '../models/User.js';
import { getConfigMap, setConfigKey } from '../models/SystemConfig.js';
import { requireAuth } from '../middleware/auth.js';
import { requireSuperAdmin } from '../middleware/role.js';
import { generateCreatorId, generateInvoiceNumber, generatePublicSlug } from '../utils/slug.js';
import { sendCreatorCredentials } from '../utils/email.js';

export const superAdminRouter = Router();

superAdminRouter.use(requireAuth(true), requireSuperAdmin);

superAdminRouter.get('/templates', async (_req, res) => {
  const list = await Template.find().sort({ sortOrder: 1, name: 1 }).lean();
  res.json({ templates: list });
});

superAdminRouter.post('/templates', async (req, res) => {
  try {
    const t = await Template.create(req.body);
    res.status(201).json({ template: t });
  } catch (e) {
    res.status(400).json({ message: e.message || 'Invalid template' });
  }
});

superAdminRouter.put('/templates/:id', async (req, res) => {
  const t = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json({ template: t });
});

superAdminRouter.delete('/templates/:id', async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

superAdminRouter.get('/creators', async (_req, res) => {
  const creators = await User.find({ role: 'creator' })
    .select('-passwordHash')
    .populate('selectedTemplate', 'name key category variant priceCents')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ creators });
});

/** Set or fix UTR / invoice fields for a pending creator (e.g. client did not send UTR at signup). */
superAdminRouter.patch('/creators/:id/invoice', async (req, res) => {
  try {
    const clean = String(req.body.utrNumber || '').trim();
    if (clean.length < 8) {
      return res.status(400).json({ message: 'UTR must be at least 8 characters' });
    }
    const existing = await User.findOne({ _id: req.params.id, role: 'creator' }).lean();
    if (!existing) return res.status(404).json({ message: 'Creator not found' });
    if (existing.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending creators can have invoice details updated this way' });
    }
    const inv = existing.invoice || {};
    const invoiceNumber = inv.invoiceNumber || generateInvoiceNumber();
    const issuedAt = inv.issuedAt || new Date();
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          paymentUtr: clean,
          'invoice.utrNumber': clean,
          'invoice.checkoutCompleted': true,
          'invoice.invoiceNumber': invoiceNumber,
          'invoice.issuedAt': issuedAt,
        },
      },
      { new: true }
    ).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'Creator not found' });
    res.json({ message: 'UTR saved', user: user.toObject() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to save UTR' });
  }
});

async function uniqueSlug() {
  for (let i = 0; i < 20; i += 1) {
    const slug = generatePublicSlug(6);
    const clash = await User.findOne({ publicSlug: slug });
    if (!clash) return slug;
  }
  return generatePublicSlug(10);
}

async function uniqueCreatorId() {
  for (let i = 0; i < 20; i += 1) {
    const creatorId = generateCreatorId(8);
    const clash = await User.findOne({ creatorId });
    if (!clash) return creatorId;
  }
  return generateCreatorId(12);
}

superAdminRouter.patch('/creators/:id/approve', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, role: 'creator' });
    if (!user) return res.status(404).json({ message: 'Creator not found' });

    const utr = String(user.invoice?.utrNumber || user.paymentUtr || '').trim();
    if (utr.length < 8) {
      return res.status(400).json({
        message: 'UTR number missing. Ask creator to complete payment reference.',
      });
    }

    if (!user.paymentUtr) user.paymentUtr = utr;
    user.set('invoice.utrNumber', utr);

    const temporaryPassword =
      req.body.temporaryPassword ||
      `Bio${Math.random().toString(36).slice(2, 8)}${Math.floor(Math.random() * 90 + 10)}!`;

    user.passwordHash = await User.hashPassword(temporaryPassword);
    user.status = 'approved';
    if (!user.creatorId) user.creatorId = await uniqueCreatorId();
    if (!user.publicSlug) user.publicSlug = await uniqueSlug();
    user.subscription = {
      active: true,
      planName: req.body.planName || 'standard',
      purchasedAt: new Date(),
    };
    user.set('invoice.paymentVerified', true);
    if (req.body.selectedTemplateId) {
      user.selectedTemplate = req.body.selectedTemplateId;
    } else if (!user.selectedTemplate) {
      const first = await Template.findOne({ isActive: true }).sort({ sortOrder: 1 });
      if (first) user.selectedTemplate = first._id;
    }
    await user.save();

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const publicUrl = `${clientUrl.replace(/\/$/, '')}/${user.publicSlug}`;
    const dashboardUrl = `${clientUrl.replace(/\/$/, '')}/creator`;

    const invoicePlain =
      user.invoice && typeof user.invoice.toObject === 'function'
        ? user.invoice.toObject()
        : user.invoice || {};

    await sendCreatorCredentials({
      to: user.email,
      displayName: user.displayName,
      creatorId: user.creatorId,
      temporaryPassword,
      dashboardUrl,
      publicUrl,
      invoice: invoicePlain,
    });

    const safe = user.toObject();
    delete safe.passwordHash;
    res.json({
      message: 'Creator approved; dashboard credentials sent.',
      user: safe,
      dashboardUrl,
      devTemporaryPassword: process.env.NODE_ENV === 'production' ? undefined : temporaryPassword,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || 'Approval failed' });
  }
});

superAdminRouter.patch('/creators/:id/reject', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: 'creator' });
  if (!user) return res.status(404).json({ message: 'Creator not found' });
  user.status = 'rejected';
  if (req.body.notes) user.notes = req.body.notes;
  await user.save();
  const safe = user.toObject();
  delete safe.passwordHash;
  res.json({ user: safe });
});

superAdminRouter.get('/config', async (_req, res) => {
  const config = await getConfigMap();
  res.json({ config });
});

superAdminRouter.patch('/config', async (req, res) => {
  const entries = req.body;
  if (!entries || typeof entries !== 'object') {
    return res.status(400).json({ message: 'Expected object of key/value pairs' });
  }
  await Promise.all(Object.entries(entries).map(([k, v]) => setConfigKey(k, v)));
  res.json({ config: await getConfigMap() });
});
