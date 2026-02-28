"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageZoom } from "@/components/ui/image-zoom";
import { componentRegistry } from "@/lib/registry";
import WaveText from "@/registry/components/wave-text";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Copy,
  Github,
  Layers,
  Moon,
  Paintbrush,
  Sparkles,
  Sun,
  Terminal,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── Animations ─── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

/* ─── Theme Toggle ─── */

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-9 w-9"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

/* ─── Features ─── */

const features = [
  {
    icon: Copy,
    title: "Copy & Paste",
    description:
      "Self-contained components. Copy the source directly into your project — zero package installs.",
  },
  {
    icon: Zap,
    title: "Animated by Default",
    description:
      "Powered by Framer Motion. Smooth, performant animations baked into every interaction.",
  },
  {
    icon: Paintbrush,
    title: "Fully Customizable",
    description:
      "Built on Tailwind CSS and shadcn/ui patterns. Every component is yours to extend.",
  },
];

/* ─── Stats ─── */

const stats = [
  { value: "3+", label: "Components" },
  { value: "100%", label: "TypeScript" },
  { value: "0", label: "Dependencies" },
  { value: "MIT", label: "License" },
];

/* ─── Page ─── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navbar ── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md  text-background">
      <ImageZoom>
                       <Image src={'/logo.webp'} alt="logo" width={1000} height={1000}/>
                   </ImageZoom>
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Sniper UI
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs/components">Components</Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-28 px-6">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.02,
          }}
        />

        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-foreground/[0.04] to-transparent blur-3xl" />
        <div className="pointer-events-none absolute top-20 -left-40 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-foreground/[0.03] to-transparent blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-40 h-[400px] w-[400px] rounded-full bg-gradient-to-l from-foreground/[0.03] to-transparent blur-3xl" />

        {/* Radial vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_75%)]" />

        <motion.div
          className="relative mx-auto max-w-4xl text-center"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1 text-xs font-medium"
            >
              <Sparkles className="h-3 w-3" />
              Open Source Component Library
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-6 text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Build stunning UIs
            <br />
            <WaveText color="#2b6bbb" repeatDelay={0.5} stagger={0.04}>
              <span>at sniper speed.</span>
            </WaveText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Premium, animated React components built with Tailwind CSS and
            Framer Motion. Copy, paste, and ship.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="lg" className="gap-2" asChild>
              <Link href="/docs/components">
                Browse Components
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </Button>
          </motion.div>

          {/* Install command */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <div className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/50 px-5 py-2.5 font-mono text-sm text-muted-foreground backdrop-blur-sm">
              <Terminal className="h-4 w-4 shrink-0" />
              <span>npx sniper-ui add magnetic-button</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-border/40 bg-muted/20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-border/40 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="px-6 py-8 text-center"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="text-2xl font-bold tracking-tight sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 text-xs">
              Why choose us
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Designed for developers
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              No npm install. No config files. Just copy the code you need and
              start building.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="group h-full border-border/40 transition-all duration-300 hover:border-border hover:shadow-[0_0_40px_-12px] hover:shadow-foreground/5">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors group-hover:bg-foreground group-hover:text-background">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Components Grid ── */}
      <section className="border-t border-border/40 bg-muted/10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-14 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 text-xs">
              <Layers className="mr-1 h-3 w-3" />
              Component Library
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Components
            </h2>
            <p className="text-muted-foreground">
              Explore the collection. More components added regularly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {componentRegistry.map((component, i) => (
              <motion.div
                key={component.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Link href={`/docs/components/${component.slug}`}>
                  <Card className="group h-full cursor-pointer border-border/40 transition-all duration-300 hover:border-border hover:shadow-[0_0_40px_-12px] hover:shadow-foreground/5">
                    <CardHeader>
                      <div className="mb-1.5">
                        <Badge variant="outline" className="text-[10px]">
                          {component.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-base transition-colors group-hover:text-foreground">
                        {component.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {component.description}
                      </CardDescription>
                      <span className="inline-flex items-center gap-1 pt-3 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        View Component
                        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border/40 px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build?
            </h2>
            <p className="text-muted-foreground">
              Start using Sniper UI components in your project today. Free and
              open source, forever.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/docs">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="https://github.com" target="_blank">
                  <Github className="h-4 w-4" />
                  Star on GitHub
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/40 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Code2 className="h-3.5 w-3.5" />
            <span>
              Sniper <span className="font-medium text-foreground">UI</span>
            </span>
          </div>
          <span>Built with Next.js, Tailwind CSS & Framer Motion</span>
        </div>
      </footer>
    </div>
  );
}
