import { Input } from "@/components/ui/input"
import { useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { WeatherElementSchema, WeatherElement  } from "./weatherTypes";

interface ElementProps {
    setSettings: (settings: WeatherElement['settings']) => void 
}

export function WeatherConfigureElement ({setSettings}: ElementProps) {
    var settingsCopy = useRef(WeatherElementSchema.parse({
        id: "weather",          
        name: "Weather",  
        settings: {
            location: "Tallinn",
            forecastDuration: "Tomorrow"
        }
    }))
    
    const selectValueChange = (value: string) => {
        if (value === "Tomorrow" || value === "4 days" || value === "Week"){
            settingsCopy.current.settings.forecastDuration = value;
            setSettings(settingsCopy.current.settings)
        }
    }
    
    const changeValueChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        settingsCopy.current.settings.location = value.target.value;
        setSettings(settingsCopy.current.settings)
    }
    
    return (
        <div className="flex">
            <Input 
                className="w-2/3" 
                defaultValue="Tallinn" 
                onChange={(value) => changeValueChange(value)} 
                placeholder="Location"
            />
            <Select onValueChange={(change) => selectValueChange(change)}>
                <SelectTrigger className="w-1/3">
                    <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="4 days">4 days</SelectItem>
                    <SelectItem value="Week">Week</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}