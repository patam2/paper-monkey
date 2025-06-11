
import { NewsletterItemProps } from "../types";
import { EllipsisVertical } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


export default function RSSElementItem({item, index, deleteFunction}: NewsletterItemProps) {
    if (item.id !== 'rss_feed') {
        return (<div>An error occured.</div>)
    }
    return (
        <div className={"mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-full" }>
            <div className="w-full flex items-end justify-center">
                <p className="flex flex-1 justify-center text-xl">RSS Summary for {item.settings.siteTitle}</p>
                <div className="flex justify-end    ms-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>RSS Summary</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteFunction(index)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div> 
            </div>
            <p>This will show a summary of daily posts from {item.settings.site}.   </p>
        </div>

    )
}