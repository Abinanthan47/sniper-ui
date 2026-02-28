"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface WaveTextProps {
  children: ReactNode;
  color?: string;
  repeatDelay?: number;
  stagger?: number;
}

export default function WaveText({
  children,
  color = "#2b6bbb",
  repeatDelay = 3,
  stagger = 0.06,
}: WaveTextProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const split = new SplitText(element, { type: "chars" });
    const chars = split.chars as HTMLElement[]; 
    const midIndex = (chars.length - 1) / 2;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: repeatDelay,
    });

    tl.call(() => {
      element.classList.add("wave-blink");
      
      chars.forEach((char, index) => {
        const distanceToCenter = Math.abs(index - midIndex);
        char.style.setProperty("--wave-color", color);
        char.style.animationDelay = `${distanceToCenter * stagger}s`;
        char.classList.add("wave-char");
      });
    });

    tl.to({}, { duration: 2 });

    tl.call(() => {
      element.classList.remove("wave-blink");
      chars.forEach((char) => char.classList.remove("wave-char"));
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, [color, repeatDelay, stagger]);

  return (
    <>
      <style jsx global>{`
        @keyframes wave-fade {
          0%, 100% { color: inherit; opacity: 1; text-shadow: none; }
          1% { color: var(--wave-color); opacity: 1; text-shadow: 0 0 8px var(--wave-color); }
          15% { opacity: 0.2; }
          40% { color: var(--wave-color); opacity: 1; }
          70% { color: inherit; opacity: 0.5; }
        }

        @keyframes wave-blink {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .wave-char {
          display: inline-block;
          animation: wave-fade 0.5s ease-out forwards;
        }

        .wave-blink {
          display: inline-block;
          animation: wave-blink 0.6s ease-out;
        }
      `}</style>
      <span ref={textRef} style={{ display: "inline-block" }}>
        {children}
      </span>
    </>
  );
}