import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';


export function AppSidebar({ activeElement }: { activeElement: 'newsletters' | `settings/${string}` }) {
  const activeColor = "bg-stone-200"
  return (
    <Sidebar className="bg-stone-600">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem >
                <SidebarMenuButton className={activeElement === 'newsletters' ? activeColor : ''} asChild>
                  <a href="/newsletter">
                    <span>My newsletters</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild>
                      <span>My integrations</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem >
                        <SidebarMenuButton className={activeElement === 'settings/rss' ? activeColor : ''}>
                          <a href="/settings/rss">
                            <span>RSS feeds</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem className={activeElement === 'settings/youtube' ? activeColor : ''}>
                        <SidebarMenuButton>
                          <a href="#">
                            <span>YouTube</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem >
                        <SidebarMenuButton className={activeElement === 'settings/hn' ? activeColor : ''}>
                          <a href="#">
                            <span>Hacker News</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
