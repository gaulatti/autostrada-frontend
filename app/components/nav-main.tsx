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
  SidebarMenuSubItem
} from '~/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavMain({
  sections,
}: {
  sections: {
    name: string, items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  }[]
}) {
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
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <Link asChild>
                        <NavLink to={item.url}>
                          <span>{item.title}</span>
                        </NavLink>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </>
            ))}
          </SidebarMenu>
        </>
      ))}
    </SidebarGroup>
  );
}
