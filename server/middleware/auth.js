import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

function getToken(req) {
  const h = req.headers.authorization;
  if (h && h.startsWith('Bearer ')) return h.slice(7);
  return null;
}

export function requireAuth(required = true) {
  return async (req, res, next) => {
    try {
      const token = getToken(req);
      if (!token) {
        if (required) return res.status(401).json({ message: 'Authentication required' });
        req.user = null;
        return next();
      }
      const secret = process.env.JWT_SECRET || 'dev-insecure-secret';
      const payload = jwt.verify(token, secret);
      const user = await User.findById(payload.sub).select('-passwordHash');
      if (!user) return res.status(401).json({ message: 'Invalid session' });
      req.user = user;
      return next();
    } catch {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
}

export function signToken(userId) {
  const secret = process.env.JWT_SECRET || 'dev-insecure-secret';
  return jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });
}
