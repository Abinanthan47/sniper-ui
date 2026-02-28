"use client";

import {
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  Package,
  Sparkles,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getComponentsByCategory } from "@/lib/registry";

// Auto-generate category-based component nav items from the registry
const categorisedComponents = getComponentsByCategory();
const componentCategoryNavItems = Object.entries(categorisedComponents).map(
  ([category, components]) => ({
    title: category,
    url: "#",
    isActive: true,
    items: components.map((c) => ({
      title: c.name,
      url: `/docs/components/${c.slug}`,
    })),
  }),
);

const data = {
  user: {
    name: "Developer",
    email: "dev@sniper-ui.com",
    avatar: "",
  },
  teams: [
    {
      name: "Sniper UI",
      logo: Code2,
      plan: "Open Source",
    },
    {
      name: "Sniper Pro",
      logo: Sparkles,
      plan: "Premium",
    },
  ],
  navMain: [
    {
      title: "Getting Started",
      url: "/docs",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Introduction",
          url: "/docs",
        },
        {
          title: "Installation",
          url: "/docs",
        },
        {
          title: "Changelog",
          url: "/docs",
        },
      ],
    },
    ...componentCategoryNavItems, // ← auto-generated categories from registry
    {
      title: "Templates",
      url: "#",
      icon: Package,
      items: [
        {
          title: "SaaS Dashboard",
          url: "#",
        },
        {
          title: "Portfolio",
          url: "#",
        },
        {
          title: "Landing Page",
          url: "#",
        },
      ],
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Editor",
          url: "#",
        },
        {
          title: "Sandbox",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "GitHub",
      url: "https://github.com/Abinanthan47/sniper-ui",
      icon: Github,
    },
    // {
    //   name: "Documentation",
    //   url: "/docs",
    //   icon: BookOpen,
    // },
    // {
    //   name: "Showcase",
    //   url: "#",
    //   icon: ExternalLink,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
