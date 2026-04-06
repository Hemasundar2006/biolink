import { Router } from 'express';
import { User } from '../models/User.js';
import { Template } from '../models/Template.js';
import { requireAuth, signToken } from '../middleware/auth.js';
import { generateCreatorId, generateInvoiceNumber, generatePublicSlug } from '../utils/slug.js';

export const authRouter = Router();

async function uniqueCreatorId() {
  for (let i = 0; i < 20; i += 1) {
    const creatorId = generateCreatorId(8);
    const clash = await User.findOne({ creatorId });
    if (!clash) return creatorId;
  }
  return generateCreatorId(12);
}

async function uniqueSlug() {
  for (let i = 0; i < 20; i += 1) {
    const slug = generatePublicSlug(6);
    const clash = await User.findOne({ publicSlug: slug });
    if (!clash) return slug;
  }
  return generatePublicSlug(10);
}

authRouter.post('/register', async (req, res) => {
  try {
    const { email, password, displayName, checkoutAt } = req.body;
    const templateIdRaw = req.body.templateId;
    const templateId = templateIdRaw ? String(templateIdRaw).trim() : '';
    const checkoutCompleted =
      req.body.checkoutCompleted === true ||
      req.body.checkoutCompleted === 'true' ||
      req.body.checkoutCompleted === 1;
    const rawUtr =
      req.body.utrNumber ?? req.body.utr ?? req.body.UTR ?? req.body.UTRNumber ?? req.body.paymentRef;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    let selectedTemplate = null;
    let selectedTemplateName = '';
    let selectedTemplatePrice = 0;
    if (templateId) {
      if (!checkoutCompleted) {
        return res.status(400).json({
          message: 'Complete checkout before registering with your chosen template.',
        });
      }
      const cleanUtr = String(rawUtr || '').trim();
      if (cleanUtr.length < 8) {
        return res.status(400).json({ message: 'Valid UTR number is required after payment.' });
      }
      const tpl = await Template.findOne({ _id: templateId, isActive: true });
      if (!tpl) return res.status(400).json({ message: 'Invalid or inactive template' });
      selectedTemplate = tpl._id;
      selectedTemplateName = tpl.name;
      selectedTemplatePrice = tpl.priceCents ?? 0;
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await User.hashPassword(password);
    const creatorId = await uniqueCreatorId();
    const isPaidCreator = Boolean(templateId && checkoutCompleted);
    const invoiceNumber = isPaidCreator ? generateInvoiceNumber() : '';
    const paidUtr = isPaidCreator ? String(rawUtr || '').trim() : '';
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      role: 'creator',
      status: 'pending',
      creatorId,
      publicSlug: undefined,
      displayName: displayName || '',
      selectedTemplate,
      paymentUtr: paidUtr,
      invoice: {
        invoiceNumber,
        templateName: selectedTemplateName || 'Starter (no template selected)',
        amountCents: selectedTemplatePrice,
        utrNumber: paidUtr,
        issuedAt: isPaidCreator ? new Date(checkoutAt || Date.now()) : undefined,
        checkoutCompleted: isPaidCreator,
        paymentVerified: false,
      },
      subscription: isPaidCreator ? { active: false, planName: 'standard' } : undefined,
    });

    return res.status(201).json({
      message: isPaidCreator
        ? 'Checkout received. Super Admin will approve your account and send credentials by email.'
        : 'Application received. Complete checkout, then wait for Super Admin approval email.',
      userId: user._id,
      creatorId: user.creatorId,
      autoApproved: false,
      invoiceNumber,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.role === 'creator' && user.status !== 'approved') {
      return res.status(403).json({
        message:
          user.status === 'pending'
            ? 'Your application is pending approval'
            : 'Your application was not approved',
      });
    }
    const token = signToken(user._id.toString());
    const safe = user.toObject();
    delete safe.passwordHash;
    return res.json({ token, user: safe });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Login failed' });
  }
});

authRouter.get('/me', requireAuth(true), async (req, res) => {
  return res.json({ user: req.user });
});
