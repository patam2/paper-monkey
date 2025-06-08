
import { z } from "zod"

export interface RSSFeedElement {
    "id": "rss_feed",
    "name": "RSS feed",
    "settings": {
        "site": string,
        "siteTitle": string,
        "summarize": string
    }
}

export const RSSFeedElementSchema = z.object({
    id: z.literal("rss_feed"),
    name: z.literal("RSS feed"),
    settings: z.object({
        site: z.string(),
        siteTitle: z.string(),
        summarize: z.string()
    })
});

const RSSFeedElementSchemaSettings = z.object({
    site: z.string().regex(new RegExp("^.*\.rss$"), "You have entered an incorrect URL"),
    siteTitle: z.string(),
    summarize: z.string().default("Yes")
})

export type RSSElementSettingsType = z.infer<typeof RSSFeedElementSchemaSettings>


export const WeatherElementSchema = z.object({
    id: z.literal("rss_feed"),
    name: z.literal("RSS feed"),
    settings: RSSFeedElementSchemaSettings
});
