'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import { Link } from '@radix-ui/themes';
import { NavLink } from 'react-router';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '~/components/ui/sidebar';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavMain({
  sections,
}: {
  sections: {
    name: string;
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      slug?: string;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  }[];
}) {
  const featureEnabled = useFeatureFlags();
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <SidebarGroup>
      {sections.map(({ name, items }) => (
        <>
          <SidebarGroupLabel>{name}</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => (
              <>
                {item.items?.length ? (
                  <Collapsible key={item.title} asChild defaultOpen={item.isActive} className='group/collapsible'>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  featureEnabled(item.slug).isEnabled() && (
                    <Link
                      asChild
                      onClick={() => {
                        if (isMobile) {
                          setOpenMobile(false);
                        }
                      }}
                      key={item.slug}
                    >
                      <NavLink to={item.url}>
                        <SidebarMenuItem>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </NavLink>
                    </Link>
                  )
                )}
              </>
            ))}
          </SidebarMenu>
        </>
      ))}
    </SidebarGroup>
  );
}
