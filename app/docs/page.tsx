import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { getDisplayedComponents } from "@/lib/registry";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Welcome to <strong className="text-foreground">Sniper UI</strong> — a
          collection of beautifully crafted, animated React components. Copy,
          paste, and customize to build stunning interfaces.
        </p>
      </div>

      <Separator />

      {/* Installation */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Installation</h2>
        <p className="text-muted-foreground leading-relaxed">
          Sniper UI components are designed to be copied directly into your
          project. Each component is self-contained and uses:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
          <li>
            <strong className="text-foreground">React 19</strong> +{" "}
            <strong className="text-foreground">TypeScript</strong>
          </li>
          <li>
            <strong className="text-foreground">Tailwind CSS v4</strong> for
            styling
          </li>
          <li>
            <strong className="text-foreground">Framer Motion</strong> for
            animations
          </li>
        </ul>

        <div className="space-y-4">
          <h3 className="text-base font-medium">Dependencies</h3>
          <p className="text-sm text-muted-foreground">
            Make sure you have these packages installed:
          </p>
          <CodeBlock
            code="npm install framer-motion clsx tailwind-merge"
            language="bash"
            filename="Terminal"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-base font-medium">Utility Function</h3>
          <p className="text-sm text-muted-foreground">
            Most components use a{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono font-medium">
              cn()
            </code>{" "}
            utility for merging classnames. Create{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono font-medium">
              lib/utils.ts
            </code>
            :
          </p>
          <CodeBlock
            code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
            language="typescript"
            filename="lib/utils.ts"
          />
        </div>
      </div>

      <Separator />

      {/* Browse Components */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Browse Components
        </h2>
        <p className="text-muted-foreground">
          Pick any component from the sidebar, or explore all of them below:
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {getDisplayedComponents().map((component) => (
            <Link
              key={component.slug}
              href={`/docs/components/${component.slug}`}
            >
              <Card className="group h-full cursor-pointer transition-colors hover:bg-accent/50">
                <CardHeader className="p-4">
                  <div className="mb-1">
                    <Badge variant="outline" className="text-[10px]">
                      {component.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm">{component.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {component.description}
                  </CardDescription>
                  <span className="inline-flex items-center gap-1 pt-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                    View
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
