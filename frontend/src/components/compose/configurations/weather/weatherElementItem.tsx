import { useState } from "react"
import { EllipsisVertical } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { WeatherElementSettingsType } from "./weatherTypes" 

interface DeleteFunc {
    (index: number): void
}
interface NewsletterItemProps {
    settings: WeatherElementSettingsType,
    index: number
    deleteFunction: DeleteFunc
}


export default function WeatherNewsletterItem ({settings, index, deleteFunction}: NewsletterItemProps) {
    console.log(settings)
    const copiedSettings = {...settings}
    return (    
        <div className={"mb-2 rounded-2xl border-stone-500 text-center text-stone-950 p-3 border-2 w-full" }>
            <div className="w-full flex items-end justify-center">
                <p className="flex flex-1 justify-center text-xl">Weather for {settings.location}</p>
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
            <p>This will show the forecast for the {settings.forecastDuration} time period.</p>
        </div>
    )
}