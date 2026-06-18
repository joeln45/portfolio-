"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CircleAlert, CircleCheckBig, LoaderCircle, Send } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "sent" | "success" | "error";

const EASE = [0.22, 1, 0.36, 1] as const;

function Field({
  label,
  name,
  type = "text",
  multiline = false,
  rows,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const base =
    "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent";
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm text-muted transition-all duration-200 group-focus-within:-translate-y-0.5 group-focus-within:text-accent"
      >
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            id={name}
            name={name}
            required
            rows={rows}
            placeholder={placeholder}
            className={`${base} resize-none`}
          />
        ) : (
          <input id={name} name={name} type={type} required className={base} />
        )}
        {/* Accent underline grows from the left on focus. */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-4 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-focus-within:scale-x-100 motion-reduce:transition-none"
        />
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();

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
        form.reset();
        if (reduce) {
          setStatus("success");
        } else {
          // Show the "Sent" check on the button, then reveal the panel.
          setStatus("sent");
          setTimeout(() => setStatus("success"), 850);
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const idleExit = reduce ? { opacity: 0 } : { y: -24, opacity: 0 };
  const panelInitial = reduce
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.98, y: 8 };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={panelInitial}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex h-full min-h-72 flex-col items-center justify-center rounded-2xl border border-border bg-surface p-10 text-center"
        >
          <motion.span
            initial={reduce ? undefined : { scale: 0.5, opacity: 0 }}
            animate={reduce ? undefined : { scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 450, damping: 15, delay: 0.1 }}
          >
            <CircleCheckBig className="text-accent-2" size={40} />
          </motion.span>
          <h3 className="mt-4 font-display text-xl font-semibold">Message sent</h3>
          <p className="mt-2 text-sm text-muted">
            Thanks for reaching out. I&apos;ll reply soon.
          </p>
          <button onClick={() => setStatus("idle")} className="btn-ghost mt-6">
            Send another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" />
            <Field label="Email" name="email" type="email" />
          </div>
          <div className="mt-4">
            <Field
              label="Message"
              name="message"
              multiline
              rows={5}
              placeholder="Tell me about the role or project…"
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
            disabled={status === "submitting" || status === "sent"}
            className="btn-primary relative mt-6 w-full overflow-hidden disabled:cursor-not-allowed disabled:opacity-60"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "submitting" ? (
                <motion.span
                  key="sending"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoaderCircle size={18} className="animate-spin" />
                  Sending…
                </motion.span>
              ) : status === "sent" ? (
                <motion.span
                  key="sent"
                  className="flex items-center gap-2"
                  initial={reduce ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                >
                  <CircleCheckBig size={18} />
                  Sent
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={idleExit}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  Send message
                  <Send size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
