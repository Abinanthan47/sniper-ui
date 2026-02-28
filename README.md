This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
sniper-ui
├─ app
│  ├─ docs
│  │  ├─ components
│  │  │  ├─ page.tsx
│  │  │  └─ [slug]
│  │  │     ├─ component-doc.tsx
│  │  │     └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ app-sidebar.tsx
│  ├─ docs
│  │  ├─ ComponentPreview.tsx
│  │  ├─ DocsRightSidebar.tsx
│  │  ├─ HeaderSearch.tsx
│  │  └─ ThemeToggle.tsx
│  ├─ nav-main.tsx
│  ├─ nav-projects.tsx
│  ├─ nav-user.tsx
│  ├─ providers
│  │  └─ ThemeProvider.tsx
│  ├─ team-switcher.tsx
│  └─ ui
│     ├─ avatar.tsx
│     ├─ badge.tsx
│     ├─ breadcrumb.tsx
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ code-block.tsx
│     ├─ collapsible.tsx
│     ├─ dropdown-menu.tsx
│     ├─ image-zoom.tsx
│     ├─ input.tsx
│     ├─ scroll-area.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sidebar.tsx
│     ├─ skeleton.tsx
│     ├─ tabs.tsx
│     └─ tooltip.tsx
├─ components.json
├─ CONTRIBUTING.md
├─ eslint.config.mjs
├─ hooks
│  └─ use-mobile.ts
├─ lib
│  ├─ component-demos.tsx
│  ├─ file-reader.ts
│  ├─ registry.ts
│  └─ utils.ts
├─ mdx-components.tsx
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ loggoo.png
│  ├─ logo.png
│  ├─ logo.webp
│  ├─ next.svg
│  ├─ r
│  │  ├─ glow-card.json
│  │  ├─ lightning-text.json
│  │  ├─ magnetic-button.json
│  │  ├─ registry.json
│  │  ├─ text-reveal.json
│  │  └─ wave-text.json
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ registry
│  └─ components
│     ├─ glow-card.tsx
│     ├─ lightning-text.tsx
│     ├─ magnetic-button.tsx
│     ├─ text-reveal.tsx
│     └─ wave-text.tsx
├─ registry.json
└─ tsconfig.json

```