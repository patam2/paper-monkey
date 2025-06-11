import { EllipsisVertical } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { NewsletterItemProps } from "../types"

export default function WeatherNewsletterItem ({item, index, deleteFunction}: NewsletterItemProps) {
    console.log(item)
    if (item.id != "weather") {
        return <div>An error occured.</div>
    }
    return (    
        <div className={"mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-full" }>
            <div className="w-full flex items-end justify-center">
                <p className="flex flex-1 justify-center text-xl">Weather for {item.settings.location}</p>
                <div className="flex justify-end    ms-auto">
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Weather</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteFunction(index)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div> 
            </div>
            <p>This will show the forecast for the {item.settings.forecastDuration} time period.</p>
        </div>
    )
}