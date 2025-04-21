import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";

import { useState } from "react";
// /newsletter
export default function NewsletterHomePage() {
    const [open, setOpen] = useState(true)

    return (
        <>
            <SidebarProvider open={open} onOpenChange={setOpen}>
                <AppSidebar/>
                <SidebarInset className="">
                    <main className="">
                        <div className="bg-stone-400">
                            <SidebarTrigger />
                            <div className="flex flex-col items-center p-4 bg-stone-200">
                            <div className="text-black">
                                <p className="text-xl">Start editing your newsletter here</p>
                                <p className="text-base">Drag and drop elements and design your daily feed.</p>
                            </div>
                            <div>
                                
                            </div>
                        
                            <Outlet></Outlet>
                            </div>
                        </div>
                    </main>

                </SidebarInset>
            </SidebarProvider>


        </>
    )
}