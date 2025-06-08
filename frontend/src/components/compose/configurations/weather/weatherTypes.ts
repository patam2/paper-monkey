import { z } from "zod";



export type WeatherElement = {
  "id": "weather",
  "name": "Weather",
  "settings": {
      "location": string,
      "forecastDuration": "Tomorrow" | "4 days" | "Week"
  }
}
 

export const WeatherElementSettings = z.object({
    location: z.string().default("Tallinn"),
    forecastDuration: z.enum(["Tomorrow", "4 days", "Week"]).default('4 days')
})

export type WeatherElementSettingsType = z.infer<typeof WeatherElementSettings>


export const WeatherElementSchema = z.object({
    id: z.literal("weather"),
    name: z.literal("Weather"),
    settings: WeatherElementSettings
});
