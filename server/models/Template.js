import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'General' },
    /** Layout family used by the React renderer (1–36) */
    variant: { type: Number, required: true, min: 1, max: 36 },
    /** Tailwind-oriented palette tokens for preview/public page */
    palette: {
      primary: { type: String, default: '#6366f1' },
      secondary: { type: String, default: '#a855f7' },
      background: { type: String, default: '#0f172a' },
      surface: { type: String, default: '#1e293b' },
      text: { type: String, default: '#f8fafc' },
      muted: { type: String, default: '#94a3b8' },
    },
    priceCents: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Template = mongoose.model('Template', templateSchema);
