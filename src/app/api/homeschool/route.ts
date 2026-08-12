import { NextResponse } from "next/server";

const notificationEmail = "cesaramuroc@gmail.com";
const autoResponse = `Hi,

Thank you for reaching out about our Homeschool Program! We'll add your information to our pre-registration list and will contact you if a spot becomes available for the next term.

We look forward to connecting with you!`;

const requiredFields = [
  "athleteFullName",
  "parentFullName",
  "email",
  "sport",
  "interestedIn",
] as const;

export async function POST(request: Request) {
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

  const formData = new URLSearchParams();
  formData.set("_subject", "New Homeschool Program Pre-Registration");
  formData.set("_template", "table");
  formData.set("_captcha", "false");
  formData.set("_replyto", body.email as string);
  formData.set("_autoresponse", autoResponse);
  formData.set("Athlete Full Name", body.athleteFullName as string);
  formData.set("Parent Full Name", body.parentFullName as string);
  formData.set("Email", body.email as string);
  formData.set("Phone", typeof body.phone === "string" ? body.phone : "");
  formData.set("Athlete Gender", typeof body.athleteGender === "string" ? body.athleteGender : "");
  formData.set("Sport", body.sport as string);
  formData.set("Grad Year", typeof body.gradYear === "string" ? body.gradYear : "");
  formData.set("Interested in", body.interestedIn as string);
  formData.set("GPA", typeof body.gpa === "string" ? body.gpa : "");
  formData.set("Current team", typeof body.currentTeam === "string" ? body.currentTeam : "");
  formData.set(
    "Primary fielding position",
    typeof body.primaryFieldingPosition === "string"
      ? body.primaryFieldingPosition
      : "",
  );

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${notificationEmail}`,
      {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to send your information right now" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the email service right now" },
      { status: 502 },
    );
  }
}
