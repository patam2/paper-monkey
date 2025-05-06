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

export interface WeatherElement {
    "id": "weather",
    "name": "Weather",
    "settings": {
        "location": string,
        "forecastDuration": "Tomorrow" | "4 days" | "Week"
    }
}

const RSSFeedElementSchema = z.object({
    id: z.literal("rss_feed"),
    name: z.literal("RSS feed"),
    settings: z.object({
        site: z.string(),
        siteTitle: z.string(),
        summarize: z.string()
    })
});

export const WeatherElementSchema = z.object({
    id: z.literal("weather"),
    name: z.literal("Weather"),
    settings: z.object({
        location: z.string(),
        forecastDuration: z.enum(["Tomorrow", "4 days", "Week"])
    })
});

const NewsletterElementSchema = z.discriminatedUnion("id", [
    RSSFeedElementSchema,
    WeatherElementSchema
]);

export const NewsletterSchema = z.object({
    name: z.string(),
    utctime: z.string(),
    newsletter_elements: z.array(NewsletterElementSchema)
});