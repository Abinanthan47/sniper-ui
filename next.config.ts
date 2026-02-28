import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  outputFileTracingIncludes: {
    '/docs/components/[slug]': ['./registry/components/**'],
  },
};


const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
