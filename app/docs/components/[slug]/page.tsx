import { readComponentSource } from "@/lib/file-reader";
import { componentRegistry, getComponentBySlug } from "@/lib/registry";
import { notFound } from "next/navigation";
import { ComponentDoc } from "./component-doc";

export function generateStaticParams() {
  return componentRegistry
    .filter((c) => c.display)
    .map((component) => ({
      slug: component.slug,
    }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const component = getComponentBySlug(slug);

  if (!component || !component.display) {
    notFound();
  }

  // Read source code on the server — no duplication needed
  const sourceCode = readComponentSource(component.file);

  return <ComponentDoc component={component} sourceCode={sourceCode} />;
}
