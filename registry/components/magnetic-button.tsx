"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 40,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({
      x: middleX * (strength / 100),
      y: middleY * (strength / 100),
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative px-8 py-3 text-sm font-semibold rounded-xl bg-primary text-primary-foreground",
        "hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-shadow duration-300",
        "cursor-pointer",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
