export function requireSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Super admin access required' });
  }
  return next();
}

export function requireApprovedCreator(req, res, next) {
  if (!req.user || req.user.role !== 'creator') {
    return res.status(403).json({ message: 'Creator access required' });
  }
  if (req.user.status !== 'approved') {
    return res.status(403).json({ message: 'Account pending approval' });
  }
  return next();
}
