"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  className?: string;
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  className,
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div
      className={cn(
        "relative w-full rounded-lg border border-border/40 bg-[#0a0a0a] font-mono text-sm overflow-hidden",
        className,
      )}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2">
        <div className="flex items-center gap-1">
          {tabsExist ? (
            tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-sans transition-colors",
                  activeTab === index
                    ? "bg-white/[0.08] text-neutral-200"
                    : "text-neutral-500 hover:text-neutral-300",
                )}
              >
                {tab.name}
              </button>
            ))
          ) : (
            <span className="text-xs text-neutral-500 font-sans">
              {filename}
            </span>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-7 w-7 text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.06]"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {/* Code area */}
      <div className="overflow-auto">
        <SyntaxHighlighter
          language={activeLanguage}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "1rem 1.25rem",
            background: "transparent",
            fontSize: "0.8125rem",
            lineHeight: "1.7",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-mono), ui-monospace, monospace",
            },
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{
            color: "rgba(255,255,255,0.15)",
            minWidth: "2.5em",
            paddingRight: "1em",
            userSelect: "none",
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? "rgba(255,255,255,0.04)"
                : "transparent",
              display: "block",
              width: "100%",
            },
          })}
          PreTag="div"
        >
          {String(activeCode)}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
