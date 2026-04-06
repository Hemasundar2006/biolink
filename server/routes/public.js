import { Router } from 'express';
import { User } from '../models/User.js';
import { Template } from '../models/Template.js';
import { getConfigMap } from '../models/SystemConfig.js';

export const publicRouter = Router();

publicRouter.get('/config', async (_req, res) => {
  const config = await getConfigMap();
  res.json({
    platformName: config.platformName ?? 'Biolink',
    maintenanceMode: Boolean(config.maintenanceMode),
  });
});

/** Public template catalog for Get started / marketing (no auth). */
publicRouter.get('/templates', async (_req, res) => {
  const templates = await Template.find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .select('key name description category variant palette priceCents')
    .lean();
  res.json({ templates });
});

publicRouter.get('/:slug', async (req, res) => {
  const config = await getConfigMap();
  if (config.maintenanceMode) {
    return res.status(503).json({ message: 'Maintenance mode' });
  }
  const user = await User.findOne({
    publicSlug: req.params.slug,
    role: 'creator',
    status: 'approved',
  })
    .populate('selectedTemplate')
    .lean();

  if (!user || !user.selectedTemplate) {
    return res.status(404).json({ message: 'Page not found' });
  }

  const template = user.selectedTemplate;
  res.json({
    slug: user.publicSlug,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    links: [...user.links].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    template,
  });
});
