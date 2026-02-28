"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          {word.split("").map((char, charIndex) => {
            const globalIndex =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              charIndex;

            return (
              <motion.span
                key={charIndex}
                className="inline-block"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={
                  hasAnimated ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                }
                transition={{
                  duration: 0.4,
                  delay: delay + globalIndex * 0.03,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
