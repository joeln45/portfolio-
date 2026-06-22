"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { scrollWindowTo } from "@/lib/utils";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => scrollWindowTo(0, !!reduce)}
      aria-label="Back to top"
      className="icon-link glass fixed bottom-6 right-6 z-50"
    >
      <ArrowUp size={18} />
    </button>
  );
}
