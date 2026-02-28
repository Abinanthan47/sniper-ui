import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getComponentsByCategory } from "@/lib/registry";
import { GlowCard } from "@/registry/components/glow-card";
import { Code2, ExternalLink, Github, Heart, Star } from "lucide-react";
import Link from "next/link";

/* ─── Docs Right Sidebar ─── */

export function DocsRightSidebar() {
  const categorised = getComponentsByCategory();
  const categoryNames = Object.keys(categorised);

  return (
    <div className="space-y-5  ">
      {/* Sniper UI Info Card */}
      <GlowCard className=" bg-card/50  p-2 overflow-hidden">
        <CardHeader className="p-4 pb-4">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Code2 className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold tracking-tight">
              Sniper UI
            </CardTitle>
          </div>
          <CardDescription className="text-xs leading-relaxed text-muted-foreground">
            An open-source library available on GitHub — contribute or star the
            repo to support it.
          </CardDescription>
          <div className="flex gap-2 pt-3">
            <Button size="sm" className="gap-1.5 flex-1 h-8 text-xs" asChild>
              <Link href="https://github.com" target="_blank">
                <Heart className="h-3 w-3" />
                Contribute
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 h-8 text-xs"
              asChild
            >
              <Link href="https://github.com" target="_blank">
                <Star className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardHeader>
      </GlowCard>

      {/* Categories */}
      <Card className="border-border/40 bg-card/50">
        <CardHeader className="p-4">
          <CardTitle className="text-xs font-semibold tracking-wider uppercase mb-3">
            Categories
          </CardTitle>
          <div className="space-y-0.5">
            {categoryNames.map((cat) => (
              <Link
                key={cat}
                href="/docs/components"
                className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <span>{cat}</span>
                <Badge
                  variant="secondary"
                  className="text-[10px] h-4 min-w-5 justify-center px-1.5"
                >
                  {categorised[cat].length}
                </Badge>
              </Link>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Links */}
      <div className="space-y-2.5 px-1">
        <Link
          href="https://github.com"
          target="_blank"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          <span>Question? Give us feedback</span>
        </Link>
        <Link
          href="https://github.com"
          target="_blank"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-3 w-3" />
          <span>Edit this page</span>
        </Link>
      </div>
    </div>
  );
}
