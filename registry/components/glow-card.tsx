"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export function GlowCard({ children, className, wrapperClassName }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative rounded-2xl p-[1px] overflow-hidden", wrapperClassName)}
      style={{
        background: isHovered
          ? `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(59,130,246,0.4), transparent 40%)`
          : "transparent",
      }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(400px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(59,130,246,0.15), transparent 40%)`,
        }}
      />

      {/* Card content */}
      <div className={cn("relative rounded-2xl bg-card p-6 h-full border border-border/50", className)}>
        {children}
      </div>
    </motion.div>
  );
}