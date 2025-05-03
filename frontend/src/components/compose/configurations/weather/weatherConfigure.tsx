import { Input } from "@/components/ui/input"
import { useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { WeatherElementSettingsType, WeatherElementSettings } from "./weatherTypes";


interface ElementProps {
    setSettings: (settings: WeatherElementSettingsType) => void 
}

export function WeatherConfigureElement ({setSettings}: ElementProps) {
    var settingsCopy = useRef(WeatherElementSettings.parse({}))
    const selectValueChange = (value: string) => {
        if (value === "Tomorrow" || value === "3 days" || value === "Week"){
            settingsCopy.current.forecastDuration = value;
            setSettings(settingsCopy.current)
        }
    }
    const changeValueChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        settingsCopy.current.location = value.target.value;
        setSettings(settingsCopy.current)
    }
    return (
        <div className="flex">
            <Input className="w-2/3" defaultValue="Tallinn" onChange={(value) => changeValueChange(value)} placeholder="Location"/>
            <Select onValueChange={(change) => selectValueChange(change)}>
                <SelectTrigger className="w-1/3">
                    <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="3 days">3 days</SelectItem>
                    <SelectItem value="Week">Week</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}