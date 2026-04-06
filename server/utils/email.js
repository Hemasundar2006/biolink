/**
 * In production, wire nodemailer or a transactional provider.
 * Logs credential delivery for local development.
 */
export async function sendCreatorCredentials({ to, displayName, temporaryPassword, publicUrl }) {
  const subject = 'Your Biolink creator account is approved';
  const body = `
Hello ${displayName || 'Creator'},

Your Biolink space has been approved.

Sign in with:
  Email: ${to}
  Temporary password: ${temporaryPassword}

Your public page: ${publicUrl}

Please change your password after first login (use profile settings when available).

— Biolink
`.trim();

  if (process.env.SMTP_HOST) {
    console.warn('[email] SMTP not implemented; logging instead.');
  }
  console.log('\n--- EMAIL (simulated) ---');
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(body);
  console.log('--- END EMAIL ---\n');

  return { ok: true, subject, body };
}
