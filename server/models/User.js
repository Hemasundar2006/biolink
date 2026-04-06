import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const linkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['super_admin', 'creator'], required: true },
    /** Creators only: approval workflow */
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    publicSlug: { type: String, unique: true, sparse: true },
    displayName: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    links: [linkSchema],
    selectedTemplate: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', default: null },
    subscription: {
      active: { type: Boolean, default: false },
      planName: { type: String, default: '' },
      purchasedAt: { type: Date },
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.statics.hashPassword = async function hashPassword(plain) {
  return bcrypt.hash(plain, 12);
};

export const User = mongoose.model('User', userSchema, 'biolink_users');
