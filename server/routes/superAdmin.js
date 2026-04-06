import { Router } from 'express';
import { Template } from '../models/Template.js';
import { User } from '../models/User.js';
import { getConfigMap, setConfigKey } from '../models/SystemConfig.js';
import { requireAuth } from '../middleware/auth.js';
import { requireSuperAdmin } from '../middleware/role.js';
import { generatePublicSlug } from '../utils/slug.js';
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
    .sort({ createdAt: -1 })
    .lean();
  res.json({ creators });
});

async function uniqueSlug() {
  for (let i = 0; i < 20; i += 1) {
    const slug = generatePublicSlug(6);
    const clash = await User.findOne({ publicSlug: slug });
    if (!clash) return slug;
  }
  return generatePublicSlug(10);
}

superAdminRouter.patch('/creators/:id/approve', async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, role: 'creator' });
  if (!user) return res.status(404).json({ message: 'Creator not found' });

  const temporaryPassword =
    req.body.temporaryPassword ||
    `Bio${Math.random().toString(36).slice(2, 8)}${Math.floor(Math.random() * 90 + 10)}!`;

  user.passwordHash = await User.hashPassword(temporaryPassword);
  user.status = 'approved';
  if (!user.publicSlug) user.publicSlug = await uniqueSlug();
  user.subscription = {
    active: true,
    planName: req.body.planName || 'standard',
    purchasedAt: new Date(),
  };
  if (req.body.selectedTemplateId) {
    user.selectedTemplate = req.body.selectedTemplateId;
  } else if (!user.selectedTemplate) {
    const first = await Template.findOne({ isActive: true }).sort({ sortOrder: 1 });
    if (first) user.selectedTemplate = first._id;
  }
  await user.save();

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const publicUrl = `${clientUrl.replace(/\/$/, '')}/${user.publicSlug}`;

  await sendCreatorCredentials({
    to: user.email,
    displayName: user.displayName,
    temporaryPassword,
    publicUrl,
  });

  const safe = user.toObject();
  delete safe.passwordHash;
  res.json({
    message: 'Creator approved; credentials emailed (simulated in console for dev).',
    user: safe,
    devTemporaryPassword: process.env.NODE_ENV === 'production' ? undefined : temporaryPassword,
  });
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
