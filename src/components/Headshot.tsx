"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";

/** Shows /public/headshot.png, gracefully falling back to a monogram tile
 *  if the file isn't present yet. */
export default function Headshot() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[20rem]">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, var(--color-accent), transparent 70%)",
        }}
      />
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-surface">
        {errored ? (
          <div className="grid h-full w-full place-items-center">
            <span className="font-display text-7xl font-bold text-gradient">
              {site.initials}
            </span>
            <span className="absolute bottom-4 font-mono text-xs text-muted">
              add /headshot.png
            </span>
          </div>
        ) : (
          <Image
            src="/headshot.png"
            alt={site.name}
            fill
            sizes="(max-width: 1024px) 80vw, 320px"
            priority
            className="object-cover object-top"
            onError={() => setErrored(true)}
          />
        )}
      </div>
    </div>
  );
}
