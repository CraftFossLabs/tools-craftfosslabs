import * as React from 'react';
import {
  ApertureIcon,
  BookOpen,
  Bot,
  ChromeIcon,
  Frame,
  IndianRupeeIcon,
  PieChart,
  Settings2,
} from 'lucide-react';
import { NavMain } from '@/components/common/nav-main';
import { NavProjects } from '@/components/common/nav-projects';
import { NavUser } from '@/components/common/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import useUserStore from '@/store/userStore';

const data = {
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
          title: 'Overview',
          url: '/personal-manger/overview',
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
          title: 'Snippets',
          url: '/code-viewer/your-snippets',
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
  const user = useUserStore(state => state.user);
  return (
    <Sidebar collapsible="icon"  {...props}>
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
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
