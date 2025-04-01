import { FileCode, HeartPulse, LayoutList, Newspaper, Radar, Tv, User } from 'lucide-react';
import * as React from 'react';
import { NavMain } from '~/components/nav-main';
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
          slug: 'O55KuRrIodma8kTP2Ium7',
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
    {
      name: 'Targets',
      items: [
        //     {
        //       title: 'Clusters',
        //       url: '/targets/clusters',
        //       icon: Group,
        //       isActive: true,
        //     },
        {
          title: 'Urls',
          url: '/urls',
          icon: FileCode,
          isActive: true,
          slug: 'mdYDhWgQMjgxHstc2O0mG',
        },
      ],
    },
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

/**
 * The `AppSidebar` component is a wrapper around the `Sidebar` component that provides
 * additional functionality and layout for the application's sidebar. It includes features
 * such as a responsive logo, team switcher, navigation sections, and user navigation.
 *
 * @param props - The props passed to the `Sidebar` component.
 *
 * @remarks
 * - The component uses the `useSidebar` hook to manage sidebar state and behavior.
 * - A `ResizeObserver` is used to dynamically determine if the sidebar is wide enough
 *   to display the full logo or a smaller icon.
 * - Feature flags are utilized to conditionally render navigation sections.
 *
 * @returns A JSX element representing the application sidebar.
 *
 * @example
 * ```tsx
 * <AppSidebar />
 * ```
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const featureEnabled = useFeatureFlags();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isWideEnough, setIsWideEnough] = React.useState(false);

  /**
   * Make sure full logo is only shown if there's enough space.
   */
  React.useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setIsWideEnough(entry.contentRect.width >= 160);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader style={{ overflow: 'hidden' }} ref={containerRef}>
        {isWideEnough ? <Logo to='/'>autostrada</Logo> : <img src='/favicon.png' className='w-8' />}
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {featureEnabled('NjAifRCOjQn6XL8n1oI3E').isEnabled() && <NavMain sections={data.sections} />}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
