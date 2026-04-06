import { Router } from 'express';
import { Template } from '../models/Template.js';
import { User } from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { requireApprovedCreator } from '../middleware/role.js';

export const creatorRouter = Router();

creatorRouter.use(requireAuth(true), requireApprovedCreator);

creatorRouter.get('/templates', async (_req, res) => {
  const templates = await Template.find({ isActive: true }).sort({ sortOrder: 1, name: 1 }).lean();
  res.json({ templates });
});

creatorRouter.get('/profile', async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-passwordHash')
    .populate('selectedTemplate')
    .lean();
  res.json({ profile: user });
});

creatorRouter.put('/profile', async (req, res) => {
  const { displayName, bio, avatarUrl } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  if (displayName !== undefined) user.displayName = displayName;
  if (bio !== undefined) user.bio = bio;
  if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
  await user.save();
  const safe = user.toObject();
  delete safe.passwordHash;
  res.json({ profile: safe });
});

creatorRouter.put('/links', async (req, res) => {
  const { links } = req.body;
  if (!Array.isArray(links)) return res.status(400).json({ message: 'links must be an array' });
  const normalized = links.map((l, i) => ({
    title: String(l.title || '').trim(),
    url: String(l.url || '').trim(),
    order: typeof l.order === 'number' ? l.order : i,
  }));
  const invalid = normalized.some((l) => !l.title || !l.url);
  if (invalid) return res.status(400).json({ message: 'Each link needs title and url' });
  const user = await User.findById(req.user._id);
  user.links = normalized;
  await user.save();
  const safe = user.toObject();
  delete safe.passwordHash;
  res.json({ profile: safe });
});

creatorRouter.put('/template', async (req, res) => {
  const { templateId } = req.body;
  const tpl = await Template.findOne({ _id: templateId, isActive: true });
  if (!tpl) return res.status(404).json({ message: 'Template not found' });
  const user = await User.findById(req.user._id);
  user.selectedTemplate = tpl._id;
  await user.save();
  const populated = await User.findById(user._id)
    .select('-passwordHash')
    .populate('selectedTemplate')
    .lean();
  res.json({ profile: populated });
});

/** Same payload as public page for live preview */
creatorRouter.get('/preview', async (req, res) => {
  const user = await User.findById(req.user._id).populate('selectedTemplate').lean();
  if (!user) return res.status(404).json({ message: 'Not found' });
  const template = user.selectedTemplate;
  if (!template) return res.status(400).json({ message: 'Select a template first' });
  res.json({
    slug: user.publicSlug,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    links: [...user.links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    template,
  });
});
