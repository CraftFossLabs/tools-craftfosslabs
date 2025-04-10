import * as React from 'react';
import {
  ApertureIcon,
  AudioWaveform,
  BookOpen,
  Bot,
  ChromeIcon,
  Command,
  Frame,
  GalleryVerticalEnd,
  IndianRupeeIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Finance Planner',
      url: '#',
      icon: IndianRupeeIcon,
      isActive: true,
      items: [
        {
          title: 'Overview',
          url: '/finance-planner/overview',
        },
        {
          title: 'Expenses',
          url: '/finance-planner/expense',
        },
        {
          title: 'Loan',
          url: '/finance-planner/loan',
        },
        {
          title: 'Reports',
          url: '/finance-planner/reports',
        },
      ],
    },
    {
      title: 'Personal Manager',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Code Viewer',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Upcoming Projects',
      url: '/contact',
      icon: Frame,
    },
    {
      name: 'Our Packages',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Free Api',
      url: '#',
      icon: ApertureIcon,
    },
    {
      name: 'Free Extensions',
      url: '#',
      icon: ChromeIcon,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex justify-start items-center gap-2">
          <img src="/Logo.svg" alt="logo" loading="lazy" className="w-6 h-6" /> CRAFTFOSSLABS
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
