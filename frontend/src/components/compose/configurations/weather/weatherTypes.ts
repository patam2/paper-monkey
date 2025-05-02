import { z } from "zod";


export interface RSSFeedElement {
  "id": "rss_feed",
  "name": "RSS feed",
  "settings": {
      "site": string,
      "siteTitle": string,
      "summarize": string
  }
}

export type WeatherElement = {
  "id": "weather",
  "name": "Weather",
  "settings": {
      "location": string,
      "forecastDuration": "Tomorrow" | "3 days" | "Week"
  }
}
 

export const WeatherElementSettings = z.object({
    location: z.string().default("Tallinn"),
    forecastDuration: z.enum(["Tomorrow", "3 days", "Week"]).default('3 days')
})

export type WeatherElementSettingsType = z.infer<typeof WeatherElementSettings>


export const WeatherElementSchema = z.object({
    id: z.literal("weather"),
    name: z.literal("Weather"),
    settings: WeatherElementSettings
});