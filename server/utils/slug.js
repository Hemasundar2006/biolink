const ALPHANUM = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generatePublicSlug(length = 6) {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
  }
  return out;
}

export function generateCreatorId(length = 8) {
  let out = 'CR-';
  for (let i = 0; i < length; i += 1) {
    out += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
  }
  return out;
}

export function generateInvoiceNumber() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  let random = '';
  for (let i = 0; i < 6; i += 1) {
    random += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
  }
  return `INV-${stamp}-${random}`;
}
