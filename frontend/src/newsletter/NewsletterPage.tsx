import { useNavigate, useOutlet } from "react-router";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";

import { useState } from "react";
import NewsletterDisplayCards from "@/components/newsletter/newsletterDisplayCards";
// /newsletter
export default function NewsletterHomePage() {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()
    const outlet = useOutlet()
    const logOut = () => {
        const logOutFunction = async () => {
            await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            }).then((resp) => {
                if (resp.status === 200) {
                    navigate('/')
                }
            })
        };
        logOutFunction()

    }
    return (
        <>
            <SidebarProvider open={open} onOpenChange={setOpen}>
                <AppSidebar activeElement="newsletters"/>
                <SidebarInset className="">
                    <main className="h-full">
                        <div className="bg-stone-200 h-full">
                            <div className="bg-stone-600 flex justify-between p-1">
                                <SidebarTrigger />
                                <div onClick={() => logOut()}>Log out</div>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-stone-200">
                                <div className="text-black pb-3">
                                    <p className="text-xl">Newsletters</p>
                                </div>
                                {outlet || <><NewsletterDisplayCards/></>}
                            </div>
                        </div>
                    </main>

                </SidebarInset>
            </SidebarProvider>


        </>
    )
}