"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

/** Shows /public/headshot.jpg, gracefully falling back to a monogram tile
 *  if the file isn't present yet. */
export default function Headshot() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-3 rounded-3xl opacity-40 blur-2xl"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
        }}
      />
      <div className="relative h-80 w-64 overflow-hidden rounded-3xl border border-border bg-surface">
        {errored ? (
          <div className="grid h-full w-full place-items-center">
            <span className="font-display text-7xl font-bold text-gradient">
              {site.initials}
            </span>
            <span className="absolute bottom-4 font-mono text-xs text-muted">
              add /headshot.jpg
            </span>
          </div>
        ) : (
          <Image
            src="/headshot.jpg"
            alt={site.name}
            fill
            sizes="256px"
            priority
            className="object-cover object-top"
            onError={() => setErrored(true)}
          />
        )}
      </div>
    </div>
  );
}
