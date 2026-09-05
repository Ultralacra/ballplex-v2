import nodemailer from "nodemailer";

export function getEmailConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  const notificationSource = process.env.SMTP_NOTIFICATION_EMAIL || from;
  if (!host || !user || !pass || !from || !notificationSource) {
    return null;
  }

  const notificationEmails = notificationSource
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (notificationEmails.length === 0) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 2525);

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === "true" || port === 465,
      auth: { user, pass },
    }),
    from: `Ballplex Website <${from}>`,
    notificationEmails,
  };
}
