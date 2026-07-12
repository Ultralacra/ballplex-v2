"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="text-brand-teal text-lg font-semibold">Thank you!</p>
        <p className="text-brand-gray mt-2">We&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/60">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/60">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className="mt-6">
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/60">
          Phone (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
          placeholder="(321) 555-0000"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="interest" className="mb-2 block text-sm font-medium text-white/60">
          I&apos;m interested in
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
        >
          <option value="">Select an option</option>
          <option value="lessons">Private Lessons</option>
          <option value="memberships">Memberships</option>
          <option value="strength">Strength & Conditioning</option>
          <option value="homeschool">Homeschool Program</option>
          <option value="rentals">Cage Rentals</option>
          <option value="events">Camps & Events</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mt-6">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/60">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <button type="submit" className="btn-primary mt-8 w-full">
        <span>Send Message</span>
      </button>
    </form>
  );
}
