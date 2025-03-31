import { HeartPulse, LayoutList, Newspaper, Radar, Tv, User } from 'lucide-react';
import * as React from 'react';
import { NavMain } from '~/components/nav-main';
import { NavProjects } from '~/components/nav-projects';
import { NavUser } from '~/components/nav-user';
import { TeamSwitcher } from '~/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, useSidebar } from '~/components/ui/sidebar';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Logo } from './ui/logo';

const data = {
  sections: [
    {
      name: 'Scans',
      items: [
        {
          title: 'Pulses',
          url: '/',
          icon: HeartPulse,
          isActive: true,
        },
        // {
        //   title: 'Projects',
        //   url: '/scans/projects',
        //   icon: FolderKanban,
        //   isActive: true,
        // },
        // {
        //   title: 'Providers',
        //   url: '/scans/providers',
        //   icon: Cable,
        //   isActive: true,
        // },
        // {
        //   title: 'Platforms',
        //   url: '/scans/platforms',
        //   icon: MonitorSmartphone,
        //   isActive: true,
        // },
      ],
    },
    // {
    //   name: "Targets",
    //   items: [
    //     {
    //       title: 'Clusters',
    //       url: '/targets/clusters',
    //       icon: Group,
    //       isActive: true,
    //     },
    //     {
    //       title: 'Urls',
    //       url: '/targets/urls',
    //       icon: FileCode,
    //       isActive: true,
    //     }
    //   ]
    // }
  ],
  projects: [
    {
      name: 'Ariston',
      url: '//ariston.gaulatti.com',
      icon: Newspaper,
    },
    {
      name: 'Alcántara',
      url: '//alcantara.gaulatti.com',
      icon: Tv,
    },
    {
      name: 'Monitor',
      url: '//monitor.gaulatti.com',
      icon: Radar,
    },
    {
      name: 'Pompeii',
      url: '//pompeii.gaulatti.com',
      icon: User,
    },
    {
      name: 'Wiphala',
      url: '//wiphala.gaulatti.com',
      icon: LayoutList,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const featureEnabled = useFeatureFlags();

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        {state !== 'collapsed' && <Logo to='/'>autostrada</Logo>}
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {featureEnabled('NjAifRCOjQn6XL8n1oI3E').isEnabled() && <NavMain sections={data.sections} />}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
