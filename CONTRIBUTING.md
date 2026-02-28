# Contributing to Sniper UI

Thank you for your interest in contributing to **Sniper UI**! This guide explains how to add a new component in just **2 files**.

---

## File Structure

```
sniper-ui/
├── registry/
│   └── components/          # Component source files
│       ├── magnetic-button.tsx
│       ├── glow-card.tsx
│       └── text-reveal.tsx
├── lib/
│   ├── registry.ts          # Component metadata (auto-drives sidebar + docs)
│   ├── component-demos.tsx  # Demo config (render, props, usage)
│   ├── file-reader.ts       # Server-side source reader (auto-reads code)
│   └── utils.ts             # Utility functions (cn)
├── app/
│   └── docs/
│       └── components/
│           └── [slug]/
│               ├── page.tsx          # Server component (reads source from disk)
│               └── component-doc.tsx  # Client component (renders the doc page)
└── components/
    └── app-sidebar.tsx       # Auto-generates nav from registry
```

---

## Adding a New Component (2 Files)

### Step 1 — Create the Component

Create your file in `registry/components/{slug}.tsx`:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MyComponentProps {
  children: React.ReactNode;
  className?: string;
}

export function MyComponent({ children, className }: MyComponentProps) {
  return <motion.div className={cn("...", className)}>{children}</motion.div>;
}
```

**Conventions:**

- `"use client"` at the top for interactive components
- Import `cn` from `@/lib/utils` for className merging
- Export a **named** function (not default)
- Define a TypeScript `interface` for props
- Use kebab-case for file names (`my-component.tsx`)
- Use PascalCase for component names (`MyComponent`)

### Step 2 — Register + Add Demo

Edit `lib/component-demos.tsx`:

**2a. Import your component:**

```tsx
import { MyComponent } from "@/registry/components/my-component";
```

**2b. Add a registry entry** in `lib/registry.ts`:

```tsx
{
  name: "My Component",
  slug: "my-component",          // must match the filename
  description: "A short description of what it does.",
  category: "Cards",             // e.g. Buttons, Cards, Text Effects
  file: "my-component.tsx",
  tags: ["animation", "hover"],  // for searchability
  dependencies: ["framer-motion", "clsx", "tailwind-merge"],
  display: true,                 // set false to hide WIP components
},
```

**2c. Add a demo entry** in `lib/component-demos.tsx`:

```tsx
"my-component": {
  render: <MyComponent>Hello</MyComponent>,
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      default: "—",
      description: "The component content.",
    },
    {
      name: "className",
      type: "string",
      default: "—",
      description: "Additional CSS classes.",
    },
  ],
  usage: `import { MyComponent } from "@/components/ui/my-component";

export default function MyPage() {
  return <MyComponent>Hello</MyComponent>;
}`,
},
```

That's it! The sidebar, doc page, source code tab, and browse grid are all **auto-generated**.

---

## What Gets Auto-Generated

| Feature                              | Source                                                  |
| ------------------------------------ | ------------------------------------------------------- |
| Sidebar nav link                     | `lib/registry.ts` → `getDisplayedComponents()`          |
| Doc page (`/docs/components/{slug}`) | `[slug]/page.tsx` reads source from disk                |
| "Code" tab source                    | `lib/file-reader.ts` reads `registry/components/{file}` |
| Props table                          | `lib/component-demos.tsx` → `props` array               |
| Browse grid on `/docs`               | `lib/registry.ts` → `getDisplayedComponents()`          |

---

## Registry Fields Reference

| Field          | Type       | Description                                       |
| -------------- | ---------- | ------------------------------------------------- |
| `name`         | `string`   | Display name (e.g. "Magnetic Button")             |
| `slug`         | `string`   | URL-safe ID, must match filename without `.tsx`   |
| `description`  | `string`   | One-liner shown in sidebar and doc header         |
| `category`     | `string`   | Grouping label (Buttons, Cards, Text Effects…)    |
| `file`         | `string`   | Filename in `registry/components/`                |
| `tags`         | `string[]` | Search/filter keywords                            |
| `dependencies` | `string[]` | npm packages required                             |
| `display`      | `boolean`  | `false` hides from sidebar, docs, and browse grid |

---

## Checklist

- [ ] Component file created in `registry/components/{slug}.tsx`
- [ ] Registry entry added in `lib/registry.ts`
- [ ] Demo entry added in `lib/component-demos.tsx`
- [ ] Verified component appears in sidebar
- [ ] Verified `/docs/components/{slug}` loads correctly
- [ ] Tested component functionality
- [ ] Code tab shows actual source code

---

## Tips

1. **Hide WIP components** — Set `display: false` in the registry entry. The component won't appear anywhere until you flip it to `true`.
2. **Dependencies** — List all npm packages your component needs. These auto-generate the install command on the doc page.
3. **Tags** — Add 3-5 relevant keywords for future search/filter features.
4. **Accessibility** — Use semantic HTML, add ARIA labels, and respect `prefers-reduced-motion`.
5. **Test locally** — Run `npm run dev` and visit `/docs/components/{slug}` to verify everything renders.

---

## Code Style

- TypeScript for all components
- Functional components with hooks
- Use `cn()` for conditional classnames
- Keep components focused and single-purpose
- Add comments for complex animation logic

---

Thank you for contributing to Sniper UI! 🎯
