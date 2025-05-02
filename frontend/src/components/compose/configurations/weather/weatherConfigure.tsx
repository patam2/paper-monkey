import { z } from "zod";
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { WeatherElementSettings, WeatherElementSettingsType } from "./weatherTypes";


interface ElementProps {
    settings: WeatherElementSettingsType,
    setSettings: (settings: WeatherElementSettingsType) => void 
}

export function WeatherConfigureElement ({settings, setSettings}: ElementProps) {
    const settingsCopy = {...settings}
    const selectValueChange = (value: string) => {
        if (value === "Tomorrow" || value === "3 days" || value === "Week"){
            settingsCopy.forecastDuration = value;
            setSettings(settingsCopy)
        }
    }
    const changeValueChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        settingsCopy.location = value.target.value;
        setSettings(settingsCopy)
    }
    return (
        <div>
            <Input onChange={(value) => changeValueChange(value)} placeholder="Location"/>
            <Select onValueChange={(change) => selectValueChange(change)}>
                <SelectTrigger>
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