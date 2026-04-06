import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDb } from './config/db.js';
import { User } from './models/User.js';
import { Template } from './models/Template.js';
import { setConfigKey } from './models/SystemConfig.js';

const templates = [
  { key: 'aurora-minimal', name: 'Aurora Minimal', variant: 1, category: 'Minimal', sortOrder: 1 },
  { key: 'noir-glass', name: 'Noir Glass', variant: 2, category: 'Dark', sortOrder: 2 },
  { key: 'sunset-cards', name: 'Sunset Cards', variant: 3, category: 'Bold', sortOrder: 3 },
  { key: 'forest-line', name: 'Forest Line', variant: 4, category: 'Nature', sortOrder: 4 },
  { key: 'ocean-pill', name: 'Ocean Pill', variant: 5, category: 'Soft', sortOrder: 5 },
  { key: 'neon-grid', name: 'Neon Grid', variant: 6, category: 'Futuristic', sortOrder: 6 },
  { key: 'ivory-editorial', name: 'Ivory Editorial', variant: 1, category: 'Minimal', sortOrder: 7 },
  { key: 'slate-pro', name: 'Slate Pro', variant: 2, category: 'Dark', sortOrder: 8 },
  { key: 'coral-burst', name: 'Coral Burst', variant: 3, category: 'Bold', sortOrder: 9 },
  { key: 'moss-soft', name: 'Moss Soft', variant: 4, category: 'Nature', sortOrder: 10 },
  { key: 'lavender-dream', name: 'Lavender Dream', variant: 5, category: 'Soft', sortOrder: 11 },
  { key: 'cyber-pulse', name: 'Cyber Pulse', variant: 6, category: 'Futuristic', sortOrder: 12 },
  { key: 'paper-ink', name: 'Paper & Ink', variant: 1, category: 'Minimal', sortOrder: 13 },
  { key: 'midnight-studio', name: 'Midnight Studio', variant: 2, category: 'Dark', sortOrder: 14 },
  { key: 'ember-stack', name: 'Ember Stack', variant: 3, category: 'Bold', sortOrder: 15 },
  { key: 'pine-outline', name: 'Pine Outline', variant: 4, category: 'Nature', sortOrder: 16 },
  { key: 'blush-ribbon', name: 'Blush Ribbon', variant: 5, category: 'Soft', sortOrder: 17 },
  { key: 'prism-shift', name: 'Prism Shift', variant: 6, category: 'Futuristic', sortOrder: 18 },
  { key: 'mono-focus', name: 'Mono Focus', variant: 1, category: 'Minimal', sortOrder: 19 },
  { key: 'carbon-fiber', name: 'Carbon Fiber', variant: 2, category: 'Dark', sortOrder: 20 },
  { key: 'tangerine-pop', name: 'Tangerine Pop', variant: 3, category: 'Bold', sortOrder: 21 },
  { key: 'sage-breath', name: 'Sage Breath', variant: 4, category: 'Nature', sortOrder: 22 },
  { key: 'pearl-soft', name: 'Pearl Soft', variant: 5, category: 'Soft', sortOrder: 23 },
  { key: 'volt-rush', name: 'Volt Rush', variant: 6, category: 'Futuristic', sortOrder: 24 },
  { key: 'neon-cyberpunk', name: 'Neon Cyberpunk', variant: 7, category: 'Futuristic', sortOrder: 25 },
  { key: 'soft-pastel-aurora', name: 'Soft Pastel Aurora', variant: 8, category: 'Soft', sortOrder: 26 },
  { key: 'brutalist-editorial', name: 'Brutalist Editorial', variant: 9, category: 'Editorial', sortOrder: 27 },
  { key: 'luxury-dark-gold', name: 'Luxury Dark Gold', variant: 10, category: 'Luxury', sortOrder: 28 },
  { key: 'cosmic-galaxy', name: 'Cosmic Galaxy', variant: 11, category: 'Futuristic', sortOrder: 29 },
  { key: 'retro-vaporwave', name: 'Retro Vaporwave', variant: 12, category: 'Retro', sortOrder: 30 },
  { key: 'glass-frost', name: 'Glass Frost', variant: 13, category: 'Soft', sortOrder: 31 },
  { key: 'nature-organic', name: 'Nature Organic', variant: 14, category: 'Nature', sortOrder: 32 },
  { key: 'minimal-zen', name: 'Minimal Zen', variant: 15, category: 'Minimal', sortOrder: 33 },
  { key: 'art-deco', name: 'Art Deco', variant: 16, category: 'Luxury', sortOrder: 34 },
  { key: 'nightclub-dark-rave', name: 'Nightclub Dark Rave', variant: 17, category: 'Futuristic', sortOrder: 35 },
  { key: 'newspaper-editorial', name: 'Newspaper Editorial', variant: 18, category: 'Editorial', sortOrder: 36 },
  { key: 'stickers-pop-art', name: 'Stickers Pop Art', variant: 19, category: 'Bold', sortOrder: 37 },
  { key: 'wood-craft', name: 'Wood Craft', variant: 20, category: 'Nature', sortOrder: 38 },
  { key: 'tech-terminal', name: 'Tech Terminal', variant: 21, category: 'Tech', sortOrder: 39 },
  { key: 'midnight-bloom', name: 'Midnight Bloom', variant: 22, category: 'Dark', sortOrder: 40 },
  { key: 'sports-bold', name: 'Sports Bold', variant: 23, category: 'Bold', sortOrder: 41 },
  { key: 'studio-portfolio', name: 'Studio Portfolio', variant: 24, category: 'Minimal', sortOrder: 42 },
  { key: 'tropical-vibrant', name: 'Tropical Vibrant', variant: 25, category: 'Bold', sortOrder: 43 },
  { key: 'monochrome-magazine', name: 'Monochrome Magazine', variant: 26, category: 'Editorial', sortOrder: 44 },
  { key: 'rainbow-gradient-flow', name: 'Rainbow Gradient Flow', variant: 27, category: 'Bold', sortOrder: 45 },
  { key: 'geometric-islamic', name: 'Geometric Islamic', variant: 28, category: 'Pattern', sortOrder: 46 },
  { key: 'y2k-chrome', name: 'Y2K Chrome', variant: 29, category: 'Retro', sortOrder: 47 },
  { key: 'sunset-duotone', name: 'Sunset Duotone', variant: 30, category: 'Soft', sortOrder: 48 },
  { key: 'stealth-dark-minimal', name: 'Stealth Dark Minimal', variant: 31, category: 'Dark', sortOrder: 49 },
  { key: 'watercolor-soft', name: 'Watercolor Soft', variant: 32, category: 'Soft', sortOrder: 50 },
  { key: 'pixel-arcade', name: 'Pixel Arcade', variant: 33, category: 'Retro', sortOrder: 51 },
  { key: 'concrete-brutalism-2', name: 'Concrete Brutalism 2', variant: 34, category: 'Brutalist', sortOrder: 52 },
  { key: 'neon-signage', name: 'Neon Signage', variant: 35, category: 'Futuristic', sortOrder: 53 },
  { key: 'royal-ornate', name: 'Royal Ornate', variant: 36, category: 'Luxury', sortOrder: 54 },
];

const palettes = [
  { primary: '#6366f1', secondary: '#a855f7', background: '#0f172a', surface: '#1e293b', text: '#f8fafc', muted: '#94a3b8' },
  { primary: '#22d3ee', secondary: '#818cf8', background: '#020617', surface: '#0f172a', text: '#e2e8f0', muted: '#64748b' },
  { primary: '#f97316', secondary: '#ec4899', background: '#1c0a05', surface: '#431407', text: '#fff7ed', muted: '#fdba74' },
  { primary: '#34d399', secondary: '#10b981', background: '#022c22', surface: '#064e3b', text: '#ecfdf5', muted: '#6ee7b7' },
  { primary: '#38bdf8', secondary: '#6366f1', background: '#082f49', surface: '#0c4a6e', text: '#f0f9ff', muted: '#7dd3fc' },
  { primary: '#e879f9', secondary: '#22d3ee', background: '#0b0014', surface: '#1a0b2e', text: '#faf5ff', muted: '#d8b4fe' },
];

function paletteForIndex(i) {
  return palettes[i % palettes.length];
}

async function run() {
  await connectDb();
  await Template.deleteMany({});
  await User.deleteMany({});

  const docs = templates.map((t, i) => ({
    ...t,
    description: `Professional ${t.category.toLowerCase()} layout — variant ${t.variant}.`,
    palette: paletteForIndex(i),
    priceCents: 999 + i * 50,
    isActive: true,
  }));
  await Template.insertMany(docs);

  const superPass = process.env.SEED_SUPER_PASSWORD || 'SuperAdmin123!';
  const superHash = await User.hashPassword(superPass);
  await User.create({
    email: 'admin@biolink.local',
    passwordHash: superHash,
    role: 'super_admin',
    status: 'approved',
    displayName: 'Super Admin',
  });

  const tpls = await Template.find().sort({ sortOrder: 1 });
  const firstTpl = tpls[0];
  const demoPass = process.env.SEED_DEMO_CREATOR_PASSWORD || 'CreatorDemo123!';
  const demoHash = await User.hashPassword(demoPass);
  await User.create({
    email: 'creator@biolink.local',
    passwordHash: demoHash,
    role: 'creator',
    status: 'approved',
    publicSlug: 'DEMO01',
    displayName: 'Demo Creator',
    bio: 'Example approved space — edit in the creator panel.',
    avatarUrl: '',
    selectedTemplate: firstTpl?._id,
    subscription: { active: true, planName: 'demo', purchasedAt: new Date() },
    links: [
      { title: 'Website', url: 'https://example.com', order: 0 },
      { title: 'YouTube', url: 'https://youtube.com', order: 1 },
      { title: 'Instagram', url: 'https://instagram.com', order: 2 },
    ],
  });

  await setConfigKey('platformName', 'Biolink');
  await setConfigKey('maintenanceMode', false);

  console.log('Seed complete.');
  console.log(`Super admin: admin@biolink.local / ${superPass}`);
  console.log(`Demo creator: creator@biolink.local / ${demoPass} · public /DEMO01`);
  console.log(`Templates: ${docs.length}`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
