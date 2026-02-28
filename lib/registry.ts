export interface ComponentRegistryItem {
  name: string;
  slug: string;
  description: string;
  category: string;
  file: string; // path relative to registry/components
  tags: string[];
  dependencies: string[]; // npm packages needed
  display: boolean; // set false to hide WIP components
}

export const componentRegistry: ComponentRegistryItem[] = [
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    description: "A button that magnetically follows the cursor on hover.",
    category: "Buttons",
    file: "magnetic-button.tsx",
    tags: ["button", "magnetic", "hover", "interactive", "cursor"],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    display: true,
  },
  {
    name: "Glow Card",
    slug: "glow-card",
    description: "A card with an animated glow border effect on hover.",
    category: "Cards",
    file: "glow-card.tsx",
    tags: ["card", "glow", "hover", "border", "gradient"],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    display: true,
  },
  {
    name: "Text Reveal",
    slug: "text-reveal",
    description: "Text that reveals character-by-character on scroll.",
    category: "Text Effects",
    file: "text-reveal.tsx",
    tags: ["text", "reveal", "scroll", "animation", "character"],
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    display: true,
  },

  {
    name: "Lightning Text",
    slug: "lightning-text",
    description: "Text with Lightning effect animation .",
    category: "Text Effects",
    file: "lightning-text.tsx",
    tags: ["text", "reveal", "shimmer", "animation", "text-animation"],
    dependencies: ["gsap"],
    display: true,
  },

  {
    name: "Wave Text",
    slug: "wave-text",
    description: "Text with center Wave effect animation .",
    category: "Text Effects",
    file: "wave-text.tsx",
    tags: ["text", "reveal", "wave", "animation", "text-animation"],
    dependencies: ["gsap"],
    display: true,
  },
];

export function getComponentBySlug(slug: string) {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getDisplayedComponents() {
  return componentRegistry.filter((c) => c.display);
}

export function getComponentsByCategory() {
  const categories: Record<string, ComponentRegistryItem[]> = {};
  for (const component of getDisplayedComponents()) {
    if (!categories[component.category]) {
      categories[component.category] = [];
    }
    categories[component.category].push(component);
  }
  return categories;
}
