import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import { authRouter } from './routes/auth.js';
import { superAdminRouter } from './routes/superAdmin.js';
import { creatorRouter } from './routes/creator.js';
import { publicRouter } from './routes/public.js';

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, name: 'biolink-api' }));

app.use('/api/auth', authRouter);
app.use('/api/super', superAdminRouter);
app.use('/api/creator', creatorRouter);
app.use('/api/public', publicRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

await connectDb();
app.listen(port, () => {
  console.log(`Biolink API listening on http://localhost:${port}`);
});
