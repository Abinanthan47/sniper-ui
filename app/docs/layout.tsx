import { AppSidebar } from "@/components/app-sidebar";
import { DocsRightSidebar } from "@/components/docs/DocsRightSidebar";
import { HeaderSearch } from "@/components/docs/HeaderSearch";
import { ThemeToggle } from "@/components/docs/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Code2, Github } from "lucide-react";
import Link from "next/link";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Top bar — sticky */}
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-border/40 px-6 bg-background/80 backdrop-blur-2xl">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border" />
            <Code2 className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Documentation</span>
          </div>

          {/* Search — navigates to /docs/components with query */}
          <HeaderSearch />

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Main content + fixed right sidebar */}
        <div className="flex flex-1 ">
          {/* Scrollable center content */}
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8">
              {children}
            </div>
          </main>

          {/* Fixed right sidebar */}
          <div className="hidden xl:flex sticky top-0 h-screen shrink-0 w-64 flex-col  border-l-2 border-border/30 px-4 py-10">
          
              <DocsRightSidebar />
           
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
