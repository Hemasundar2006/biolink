import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const SystemConfig = mongoose.model('SystemConfig', entrySchema, 'biolink_systemconfigs');

export async function getConfigMap() {
  const rows = await SystemConfig.find().lean();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function setConfigKey(key, value) {
  await SystemConfig.findOneAndUpdate(
    { key },
    { value },
    { upsert: true, new: true }
  );
}
