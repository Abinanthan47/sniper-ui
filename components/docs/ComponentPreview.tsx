"use client";

import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
}

export function ComponentPreview({
  children,
  code,
  title,
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tabs defaultValue="preview" className="w-full">
      <div className="flex items-center justify-between rounded-t-lg border bg-muted/30 px-1">
        <TabsList className="h-10 bg-transparent">
          <TabsTrigger
            value="preview"
            className="text-xs data-[state=active]:bg-background"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="text-xs data-[state=active]:bg-background"
          >
            Code
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2 pr-1">
          {title && (
            <span className="hidden text-[11px] font-mono text-muted-foreground sm:inline">
              {title}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-7 w-7"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>

      <TabsContent value="preview" className="mt-0">
        <div className="flex min-h-[280px] items-center justify-center rounded-b-lg border border-t-0 bg-background/50 p-8">
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code" className="mt-0">
        <div className="relative max-h-[480px] overflow-auto rounded-b-lg border border-t-0">
          <CodeBlock
            language="tsx"
            filename={title || "component.tsx"}
            code={code}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
