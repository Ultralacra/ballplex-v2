import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const publicSiteUrl = (
  process.env.PUBLIC_SITE_URL || "https://theballplex.com"
).replace(/\/$/, "");
const logoUrl = `${publicSiteUrl}/LOGO.png`;

const requiredFields = [
  "athleteFullName",
  "parentFullName",
  "email",
  "sport",
  "interestedIn",
] as const;

export async function POST(request: Request) {
  if (!smtpUser || !smtpPass) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  for (const field of requiredFields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json(
        { error: `${field} is required` },
        { status: 400 },
      );
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(body.email as string)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const fields = [
    ["Athlete Full Name", body.athleteFullName],
    ["Parent Full Name", body.parentFullName],
    ["Email", body.email],
    ["Phone", body.phone],
    ["Athlete Gender", body.athleteGender],
    ["Sport", body.sport],
    ["Grad Year", body.gradYear],
    ["Interested in", body.interestedIn],
    ["GPA", body.gpa],
    ["Current team", body.currentTeam],
    ["Primary fielding position", body.primaryFieldingPosition],
  ]
    .map(([label, value]) => `${label}: ${typeof value === "string" ? value : ""}`)
    .join("\n");

  const userMessage = `Hi,

Thank you for reaching out about our Homeschool Program! We'll add your information to our pre-registration list and will contact you if a spot becomes available for the next term.

We look forward to connecting with you!`;

  const userMessageHtml = `
    <div style="margin:0;background:#f4f7f7;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#182326;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #dce5e5;border-radius:16px;overflow:hidden;">
        <tr>
          <td style="background:#11191b;padding:28px 32px;text-align:center;">
            <img src="${logoUrl}" alt="Ballplex" width="150" style="display:block;width:150px;height:auto;margin:0 auto;" />
          </td>
        </tr>
        <tr>
          <td style="padding:40px 36px 32px;">
            <p style="margin:0 0 12px;color:#159b98;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">Homeschool Program</p>
            <h1 style="margin:0;color:#182326;font-size:28px;line-height:1.2;font-weight:700;">Thanks for reaching out!</h1>
            <p style="margin:24px 0 0;color:#4c5b5e;font-size:16px;line-height:1.7;">Thank you for reaching out about our Homeschool Program! We'll add your information to our pre-registration list and will contact you if a spot becomes available for the next term.</p>
            <p style="margin:18px 0 0;color:#4c5b5e;font-size:16px;line-height:1.7;">We look forward to connecting with you!</p>
            <div style="margin:30px 0 0;padding:18px 20px;background:#edf8f7;border-left:4px solid #159b98;border-radius:6px;color:#285052;font-size:14px;line-height:1.6;">Your information has been received successfully.</div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 36px;background:#f4f7f7;color:#718083;font-size:12px;line-height:1.6;">Ballplex &middot; Learn. Develop. Perform.<br />This is a confirmation of your pre-registration inquiry.</td>
        </tr>
      </table>
    </div>`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_PORT || "465") === "465",
      auth: { user: smtpUser, pass: smtpPass },
    });

    await Promise.all([
      transporter.sendMail({
        from: `Ballplex Website <${smtpUser}>`,
        to: smtpUser,
        replyTo: body.email as string,
        subject: "New Homeschool Program Pre-Registration",
        text: fields,
      }),
      transporter.sendMail({
        from: `Ballplex Website <${smtpUser}>`,
        to: body.email as string,
        subject: "Ballplex Homeschool Program",
        text: userMessage,
        html: userMessageHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SMTP email error", error);
    return NextResponse.json(
      { error: "Unable to reach the email service right now" },
      { status: 502 },
    );
  }
}
