"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/docs/components?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/docs/components");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative hidden sm:block flex-1 max-w-xs mx-4"
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search components..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-8 h-8 bg-muted/40 border-border/50 text-xs rounded-md"
      />
    </form>
  );
}
