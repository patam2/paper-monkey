import { useOutlet, useLocation} from "react-router"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { useState } from "react"
export default function Settings()  {
    const outlet = useOutlet()
    const [open, setOpen] = useState(true)
    const location = useLocation().pathname.split("/")
    const settingsPath = location[location.length - 1]
    return (
        <>
            <SidebarProvider open={open} onOpenChange={setOpen}>
                <AppSidebar activeElement={`settings/${settingsPath}`}/>
                <SidebarInset className="">
                    <main className="h-full">
                        <div className="bg-stone-200 h-full">
                            <div className="bg-stone-600">
                                <SidebarTrigger />
                            </div>
                            {outlet}
                        </div>
                    </main>

                </SidebarInset>
            </SidebarProvider>
        </>
    )
}