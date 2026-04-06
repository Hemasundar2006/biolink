import { Router } from 'express';
import { User } from '../models/User.js';
import { Template } from '../models/Template.js';
import { requireAuth, signToken } from '../middleware/auth.js';

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { email, password, displayName, templateId, checkoutCompleted } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    let selectedTemplate = null;
    if (templateId) {
      if (!checkoutCompleted) {
        return res.status(400).json({
          message: 'Complete checkout before registering with your chosen template.',
        });
      }
      const tpl = await Template.findOne({ _id: templateId, isActive: true });
      if (!tpl) return res.status(400).json({ message: 'Invalid or inactive template' });
      selectedTemplate = tpl._id;
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await User.hashPassword(password);
    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      role: 'creator',
      status: 'pending',
      displayName: displayName || '',
      selectedTemplate,
    });
    return res.status(201).json({
      message: 'Application received. You will receive login credentials by email after approval.',
      userId: user._id,
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
