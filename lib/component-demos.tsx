import { GlowCard } from "@/registry/components/glow-card";
import { LightningText } from "@/registry/components/lightning-text";
import { MagneticButton } from "@/registry/components/magnetic-button";
import { TextReveal } from "@/registry/components/text-reveal";
import WaveText from "@/registry/components/wave-text";
/* ─── Prop Definition ─── */

export interface PropDef {
  name: string;
  type: string;
  default: string;
  description: string;
}

/* ─── Demo Configuration ─── */

export interface ComponentDemo {
  render: React.ReactNode;
  props: PropDef[];
  usage: string;
  usageAdvanced?: string;
}

/**
 * Centralized demo config for each component, keyed by slug.
 *
 * When adding a new component, add its import above and a new entry here.
 * The source code is auto-read from the file system — no need to duplicate it.
 */
export const componentDemos: Record<string, ComponentDemo> = {
  "magnetic-button": {
    render: <MagneticButton>Hover Me</MagneticButton>,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "The button content.",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes to apply.",
      },
      {
        name: "strength",
        type: "number",
        default: "40",
        description:
          "Controls how strongly the button follows the cursor. Higher = more movement.",
      },
    ],
    usage: `import { MagneticButton } from "@/components/ui/magnetic-button";

export default function MyPage() {
  return (
    <MagneticButton>
      Click me
    </MagneticButton>
  );
}`,
    usageAdvanced: `import { MagneticButton } from "@/components/ui/magnetic-button";

export default function MyPage() {
  return (
    <div className="flex gap-4">
      {/* Default strength */}
      <MagneticButton>Default</MagneticButton>

      {/* Stronger pull */}
      <MagneticButton strength={80}>Strong Pull</MagneticButton>

      {/* Custom styled */}
      <MagneticButton className="rounded-full px-6">
        Rounded
      </MagneticButton>
    </div>
  );
}`,
  },
  "glow-card": {
    render: (
      <GlowCard className="p-8">
        <h3 className="mb-2 text-lg font-semibold">Glow Card</h3>
        <p className="text-sm text-muted-foreground">
          Hover over this card to see the glow effect follow your cursor along
          the border.
        </p>
      </GlowCard>
    ),
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "The card content.",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes for the outer wrapper.",
      },
    ],
    usage: `import { GlowCard } from "@/components/ui/glow-card";

export default function MyPage() {
  return (
    <GlowCard className="p-6">
      <h3 className="text-lg font-semibold">My Card</h3>
      <p className="text-sm text-muted-foreground">
        Hover to see the glow.
      </p>
    </GlowCard>
  );
}`,
    usageAdvanced: `import { GlowCard } from "@/components/ui/glow-card";

export default function MyPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GlowCard>
        <h3 className="font-semibold">Feature 1</h3>
        <p className="text-sm text-muted-foreground">
          Lightning-fast build times.
        </p>
      </GlowCard>
      <GlowCard>
        <h3 className="font-semibold">Feature 2</h3>
        <p className="text-sm text-muted-foreground">
          Type-safe by default.
        </p>
      </GlowCard>
      <GlowCard className="md:col-span-1">
        <h3 className="font-semibold">Feature 3</h3>
        <p className="text-sm text-muted-foreground">
          Edge-ready deployment.
        </p>
      </GlowCard>
    </div>
  );
}`,
  },
  "text-reveal": {
    render: (
      <div className="text-3xl font-bold">
        <TextReveal text="Sniper UI makes interfaces beautiful." />
      </div>
    ),
    props: [
      {
        name: "text",
        type: "string",
        default: "—",
        description: "The text string to animate character by character.",
      },
      {
        name: "className",
        type: "string",
        default: "—",
        description: "Additional CSS classes for the wrapper.",
      },
      {
        name: "delay",
        type: "number",
        default: "0",
        description:
          "Delay in seconds before the animation starts after scrolling into view.",
      },
    ],
    usage: `import { TextReveal } from "@/components/ui/text-reveal";

export default function MyPage() {
  return (
    <h1 className="text-4xl font-bold">
      <TextReveal text="Hello, world!" />
    </h1>
  );
}`,
    usageAdvanced: `import { TextReveal } from "@/components/ui/text-reveal";

export default function MyPage() {
  return (
    <div className="space-y-4">
      {/* Staggered headings */}
      <h1 className="text-5xl font-bold">
        <TextReveal text="Build something" />
      </h1>
      <h2 className="text-3xl text-muted-foreground">
        <TextReveal text="extraordinary today." delay={0.5} />
      </h2>
    </div>
  );
}`,
  },

  "lightning-text": {
    render: (
      <LightningText color="#2b6bbb" repeatDelay={1.5} stagger={0.04}>
        <h1 className="text-7xl ">Lightning</h1>
      </LightningText>
    ),
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "The content to apply the lightning effect to.",
      },
      {
        name: "color",
        type: "string",
        default: '"#2b6bbb"',
        description: "The color of the lightning flash.",
      },
      {
        name: "repeatDelay",
        type: "number",
        default: "1.5",
        description: "Seconds to wait before repeating the animation.",
      },
      {
        name: "stagger",
        type: "number",
        default: "0.04",
        description:
          "Stagger delay (in seconds) between each character's animation.",
      },
    ],
    usage: `import { LightningText } from "@/components/ui/lightning-text";

export default function MyPage() {
  return (
    <LightningText>
      Hello World
    </LightningText>
  );
}`,
    usageAdvanced: `import { LightningText } from "@/components/ui/lightning-text";

export default function MyPage() {
  return (
    <div className="space-y-4">
      {/* Custom color and speed */}
      <LightningText color="#ff6b35" repeatDelay={0.8} stagger={0.02}>
        <h1 className="text-5xl font-bold">Fast Lightning</h1>
      </LightningText>

      {/* Slower, blue effect */}
      <LightningText color="#2b6bbb" repeatDelay={2} stagger={0.06}>
        <p className="text-2xl">Subtle shimmer effect</p>
      </LightningText>
    </div>
  );
}`,
  },

  "wave-text": {
    render: (
      <WaveText color="#ff6600ff" repeatDelay={1.5}>
        <h1 className="text-6xl">CENTER WAVE EFFECT</h1>
      </WaveText>
    ),
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        default: "—",
        description: "The content to apply the wave effect to.",
      },
      {
        name: "color",
        type: "string",
        default: '"#ff6600ff"',
        description: "The color of the wave effect.",
      },
      {
        name: "repeatDelay",
        type: "number",
        default: "1.5",
        description: "Seconds to wait before repeating the animation.",
      },
    ],
    usage: `import { WaveText } from "@/components/ui/wave-text";

export default function MyPage() {
  return (
    <WaveText color="#ff6b35" repeatDelay={1.5}>
        <h1 className="text-6xl">CENTER WAVE EFFECT</h1>
    </WaveText>
  );
}`,
    usageAdvanced: `import WaveText from "@/components/ui/wave-text";

export default function MyPage() {
  return (
    <div className="space-y-4">
      {/* Warm orange wave */}
      <WaveText color="#ff6b35" repeatDelay={0.8}>
        <h1 className="text-5xl font-bold">Fast Wave</h1>
      </WaveText>

      {/* Cool blue wave */}
      <WaveText color="#2b6bbb" repeatDelay={2}>
        <p className="text-2xl">Subtle wave effect</p>
      </WaveText>
    </div>
  );
}`,
  },
};
