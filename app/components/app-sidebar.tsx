import { Select } from '@radix-ui/themes';
import { FileCode, HeartPulse, LayoutList, Newspaper, Radar, Tv, User } from 'lucide-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NavMain } from '~/components/nav-main';
import { NavUser } from '~/components/nav-user';
import { TeamSwitcher } from '~/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '~/components/ui/sidebar';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Logo } from './ui/logo';

/**
 * The `AppSidebar` component is a wrapper around the t('ui.sidebar') component that provides
 * additional functionality and layout for the application's sidebar. It includes features
 * such as a responsive logo, team switcher, navigation sections, and user navigation.
 *
 * @param props - The props passed to the t('ui.sidebar') component.
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
  const { t } = useTranslation();

  const data = {
    sections: [
      {
        name: t('scans.section'),
        items: [
          {
            title: t('scans.pulses'),
            url: '/',
            icon: HeartPulse,
            isActive: true,
            slug: 'O55KuRrIodma8kTP2Ium7',
          },
          // {
          //   title: t('scans.projects'),
          //   url: '/scans/projects',
          //   icon: FolderKanban,
          //   isActive: true,
          // },
          // {
          //   title: t('scans.providers'),
          //   url: '/scans/providers',
          //   icon: Cable,
          //   isActive: true,
          // },
          // {
          //   title: t('scans.platforms'),
          //   url: '/scans/platforms',
          //   icon: MonitorSmartphone,
          //   isActive: true,
          // },
        ],
      },
      {
        name: t('targets.section'),
        items: [
          //     {
          //       title: t('targets.clusters'),
          //       url: '/targets/clusters',
          //       icon: Group,
          //       isActive: true,
          //     },
          {
            title: t('targets.urls'),
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

  const { i18n } = useTranslation();

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
        <Select.Root
          defaultValue='en'
          onValueChange={(value) => {
            i18n.changeLanguage(value);
          }}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Language</Select.Label>
              <Select.Item value='en'>English</Select.Item>
              <Select.Item value='es'>Spanish</Select.Item>
              <Select.Item value='pt'>Portuguese</Select.Item>
              <Select.Item value='it'>Italian</Select.Item>
              <Select.Item value='fr'>French</Select.Item>
              <Select.Item value='de'>German</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
