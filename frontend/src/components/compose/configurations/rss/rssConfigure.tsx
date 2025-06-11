import { Input } from "@/components/ui/input"
import { useRef } from "react";

import { RSSElement, RSSFeedElementSchema } from "./rssTypes";

interface ElementProps {
    setSettings: (settings: RSSElement['settings']) => void 
}

export function RSSConfigureElement ({setSettings}: ElementProps) {
    var settingsCopy = useRef(RSSFeedElementSchema.parse({
        id: "rss_feed",          
        name: "RSS feed",  
        settings: {
            site: "https://example.com/.rss",
            siteTitle: "",
            summarize: ""
        }
    }))
        
    const changeValueChange = (value: React.ChangeEvent<HTMLInputElement>, changed: "site" | "title") => {
        if (changed === "site") {
            settingsCopy.current.settings.site = value.target.value;
        }
        else {
            settingsCopy.current.settings.siteTitle = value.target.value
        }
        setSettings(settingsCopy.current.settings)
    }
    
    return (
        <div className="flex">
            <Input 
                className="w-2/3" 
                defaultValue="" 
                onChange={(value) => changeValueChange(value, 'site')} 
                placeholder="Site url"
            />
            <Input 
                className="w-2/3" 
                defaultValue="" 
                onChange={(value) => changeValueChange(value, 'title')} 
                placeholder="Site name"
            />
        </div>
    )
}