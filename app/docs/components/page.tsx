"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { componentDemos } from "@/lib/component-demos";
import { getDisplayedComponents } from "@/lib/registry";
import { motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

/* ─── Page ─── */

function ComponentsPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const allComponents = getDisplayedComponents();

  /* Sync from URL when navigating via header search */
  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";
    if (urlQuery !== query) {
      setQuery(urlQuery);
      setDebouncedQuery(urlQuery);
    }
  }, [searchParams]);

  /* Debounced search via transition */
  function handleSearch(value: string) {
    setQuery(value);
    startTransition(() => {
      setDebouncedQuery(value);
    });
  }

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return allComponents;
    return allComponents.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [debouncedQuery, allComponents]);

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <h1 className="text-3xl font-medium tracking-tight">Components</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Here you can explore the available components in our library. Ongoing
          development will bring more soon.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="my-6"
      >
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search components..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 pr-9 h-9 bg-muted/30 border-border/50 text-sm rounded-lg"
          />
          {query && (
            <button
              onClick={() => {
                handleSearch("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.map((component, i) => {
          const demo = componentDemos[component.slug];
          return (
            <motion.div
              key={component.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={`/docs/components/${component.slug}`}
                className="block group"
              >
                <Card className="h-full border-border/40  bg-card/40 overflow-hidden transition-all duration-300 hover:border-border/80 hover:shadow-lg hover:shadow-foreground/[0.03]">
                  {/* ── Preview ── */}
                  <div className="relative  flex aspect-[3/2] items-center justify-center overflow-hidden bg-gradient-to-br from-muted/40 via-muted/20 to-transparent p-6">
                    {/* Dot grid */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.035]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, var(--foreground) 0.8px, transparent 0.8px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    {/* Radial glow */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--foreground)/3%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {/* Component demo */}
                    <div className="relative z-10 transform scale-85 pointer-events-none select-none">
                      {demo?.render ?? (
                        <span className="text-xs text-muted-foreground">
                          Preview
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Footer ── */}
                  <div className="flex items-center justify-between border-t border-border/30 px-4 py-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-sm font-medium truncate">
                        {component.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-[10px] shrink-0 hidden sm:inline-flex"
                      >
                        {component.category}
                      </Badge>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/50 mb-4">
            <Search className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-base font-medium text-muted-foreground">
            No components found
          </p>
          <p className="text-sm text-muted-foreground/60 mt-1">
            Try searching with a different term
          </p>
          <button
            onClick={() => {
              handleSearch("");
              inputRef.current?.focus();
            }}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Clear search
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-muted-foreground">
          Loading components...
        </div>
      }
    >
      <ComponentsPageContent />
    </Suspense>
  );
}
