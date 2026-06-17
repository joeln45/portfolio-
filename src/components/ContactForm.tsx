"use client";

import { useState } from "react";
import { CircleAlert, CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(site.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-10 text-center">
        <CircleCheckBig className="text-accent-2" size={40} />
        <h3 className="mt-4 font-display text-xl font-semibold">Message sent</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-ghost mt-6">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" />
        <Field label="Email" name="email" type="email" />
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about the role or project…"
          className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 flex items-center gap-2 text-sm text-red-400">
          <CircleAlert size={16} />
          Something went wrong. You can email me directly at {site.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
