import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { Geist_Mono, Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmsans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Sniper UI — Premium React Components",
  description:
    "A collection of beautifully crafted, animated React components built with Tailwind CSS and Framer Motion. Copy, paste, and ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}  ${dmsans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
