"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(SplitText);

interface LightningTextProps {
  children: ReactNode;
  color?: string;
  repeatDelay?: number;
  stagger?: number;
}

export function LightningText({
  children,
  color = "#2b6bbb",
  repeatDelay = 1.5,
  stagger = 0.04,
}: LightningTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, { type: "chars" });

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: repeatDelay,
    });

    tl.call(() => {
      if (!textRef.current) return;
      textRef.current.classList.add("lightning-blink");
      split.chars.forEach((el, index) => {
        const char = el as HTMLElement;
        char.style.setProperty("--lightning-color", color);
        char.style.animationDelay = `${index * stagger}s`;
        char.classList.add("lightning-char");
      });
    });

    tl.to({}, { duration: 1.5 });

    tl.call(() => {
      if (!textRef.current) return;
      textRef.current.classList.remove("lightning-blink");
      split.chars.forEach((el) =>
        (el as HTMLElement).classList.remove("lightning-char"),
      );
    });

    return () => {
      tl.kill();
      split.revert();
    };
  }, [color, repeatDelay, stagger]);

  return (
    <>
      <style jsx global>{`
        @keyframes lightning-fade {
          0%,
          100% {
            color: inherit;
            opacity: 1;
          }
          1% {
            color: var(--lightning-color);
            opacity: 1;
          }
          15% {
            opacity: 0.2;
          }
          30% {
            opacity: 0.8;
          }
          40% {
            color: var(--lightning-color);
            opacity: 1;
          }
          55% {
            opacity: 1;
          }
          70% {
            color: inherit;
            opacity: 0.5;
          }
          85% {
            opacity: 1;
          }
        }

        @keyframes lightning-blink {
          0%,
          70%,
          100% {
            opacity: 1;
          }
          20% {
            opacity: 0.3;
          }
          35% {
            opacity: 0.85;
          }
          55% {
            opacity: 0.2;
          }
        }

        .lightning-char {
          display: inline-block;
          animation: lightning-fade 0.4s ease-out forwards;
        }

        .lightning-blink {
          display: inline-block;
          animation: lightning-blink 0.6s ease-out;
        }
      `}</style>
      <span ref={textRef} style={{ display: "inline-block" }}>
        {children}
      </span>
    </>
  );
}
