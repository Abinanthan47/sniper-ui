"use client";

import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { componentDemos, type PropDef } from "@/lib/component-demos";
import type { ComponentRegistryItem } from "@/lib/registry";

/* ─── Props Table ─── */

function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/30">
            <th className="px-4 py-2.5 text-left font-medium text-foreground">
              Prop
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-foreground">
              Type
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-foreground">
              Default
            </th>
            <th className="px-4 py-2.5 text-left font-medium text-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b last:border-0">
              <td className="px-4 py-2.5">
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono font-semibold text-foreground">
                  {prop.name}
                </code>
              </td>
              <td className="px-4 py-2.5">
                <code className="text-xs font-mono text-muted-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-2.5">
                <code className="text-xs font-mono text-muted-foreground">
                  {prop.default}
                </code>
              </td>
              <td className="px-4 py-2.5 text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Component Doc Page ─── */

interface ComponentDocProps {
  component: ComponentRegistryItem;
  sourceCode: string;
}

export function ComponentDoc({ component, sourceCode }: ComponentDocProps) {
  const demo = componentDemos[component.slug];

  if (!demo) {
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{component.name}</h1>
        <p className="mt-2 text-muted-foreground">Documentation coming soon.</p>
      </div>
    );
  }

  const installCmd = component.dependencies.length
    ? `npm install ${component.dependencies.join(" ")}`
    : null;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-[10px]">
            {component.category}
          </Badge>
          {component.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-[10px] font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{component.name}</h1>
        <p className="mt-1 text-muted-foreground">{component.description}</p>
      </div>

      {/* Live Preview — code is read from actual file */}
      <ComponentPreview code={sourceCode} title={component.file}>
        {demo.render}
      </ComponentPreview>

      <Separator />

      {/* Installation */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Installation</h2>

        <Tabs defaultValue="cli" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="space-y-6">
            <div className="space-y-3">
              <CodeBlock
                code={`npx shadcn@latest add "https://sniper-ui-coral.vercel.app/r/${component.slug}.json"`}
                language="bash"
                filename="Terminal"
              />
            </div>

            {installCmd && (
              <div className="space-y-3">
                <h3 className="text-base font-medium">
                  Auto-Installed Dependencies
                </h3>
                <p className="text-sm text-muted-foreground">
                  The CLI will automatically install these packages.
                </p>
                <CodeBlock
                  code={installCmd}
                  language="bash"
                  filename="Terminal"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            {installCmd && (
              <div className="space-y-3">
                <h3 className="text-base font-medium">Install Dependencies</h3>
                <CodeBlock
                  code={installCmd}
                  language="bash"
                  filename="Terminal"
                />
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-base font-medium">Copy the Component</h3>
              <p className="text-sm text-muted-foreground">
                Copy the component code from the{" "}
                <strong className="text-foreground">Code</strong> tab above and
                paste it into your project at{" "}
                <code className="rounded bg-secondary px-1.5 py-0.5 text-xs font-mono font-medium">
                  components/ui/{component.slug}.tsx
                </code>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Separator />

      {/* Usage */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Usage</h2>

        <div className="space-y-3">
          <h3 className="text-base font-medium">Basic</h3>
          <CodeBlock code={demo.usage} language="tsx" filename="page.tsx" />
        </div>

        {demo.usageAdvanced && (
          <div className="space-y-3">
            <h3 className="text-base font-medium">Examples</h3>
            <CodeBlock
              code={demo.usageAdvanced}
              language="tsx"
              filename="examples.tsx"
            />
          </div>
        )}
      </div>

      <Separator />

      {/* Props Reference */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Props</h2>
        <PropsTable props={demo.props} />
      </div>
    </div>
  );
}
