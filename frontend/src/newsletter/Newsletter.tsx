import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";

// /newsletter
export default function NewsletterHomePage() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                
                </main>
            </SidebarProvider>

            <Outlet/>

        </>
    )
}