/**
 * In production, wire nodemailer or a transactional provider.
 * Logs credential delivery for local development.
 */
export async function sendCreatorCredentials({
  to,
  displayName,
  creatorId,
  temporaryPassword,
  dashboardUrl,
  publicUrl,
  invoice,
}) {
  const subject = 'Your Biolink creator account is approved';
  const body = `
Hello ${displayName || 'Creator'},

Your Biolink space has been approved.

Sign in with:
  Creator ID: ${creatorId || 'N/A'}
  Email: ${to}
  Password: ${temporaryPassword || '(the password set during registration)'}
  Dashboard: ${dashboardUrl}

Your public page: ${publicUrl}

Invoice:
  Number: ${invoice?.invoiceNumber || 'N/A'}
  Template: ${invoice?.templateName || 'N/A'}
  Amount: $${(((invoice?.amountCents || 0) / 100) || 0).toFixed(2)}
  Issued: ${invoice?.issuedAt ? new Date(invoice.issuedAt).toISOString() : 'N/A'}

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
