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
    SidebarMenuSubItem
  } from "@/components/ui/sidebar"
  
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible"

// Menu items.
   
export function AppSidebar() {
    return (
        <Sidebar className="bg-stone-600">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                              <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                  <a href='#'>
                                    <span>Home</span>
                                  </a>
                                </SidebarMenuButton>
                             </SidebarMenuItem>
                             <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                  <a href='/newsletter'>
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
                                    <SidebarMenuSubItem><SidebarMenuButton><a href="#"><span>RSS feeds</span></a></SidebarMenuButton></SidebarMenuSubItem>
                                    <SidebarMenuSubItem><SidebarMenuButton><a href="#"><span>YouTube</span></a></SidebarMenuButton></SidebarMenuSubItem>
                                    <SidebarMenuSubItem><SidebarMenuButton><a href="#"><span>Hacker News</span></a></SidebarMenuButton></SidebarMenuSubItem>
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </SidebarMenuItem>
                            </Collapsible>
                             <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                  <a href='#'>
                                    <span>Settings</span>
                                  </a>
                                </SidebarMenuButton>
                             </SidebarMenuItem>

                    </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
      </Sidebar>
    )
}
