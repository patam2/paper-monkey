import { z } from "zod";


export const WeatherElementSchema = z.object({
  id: z.literal("weather"),
  name: z.literal("Weather"),
  settings: z.object({
    location: z.string().default("Tallinn"),
    forecastDuration: z.enum(["Tomorrow", "4 days", "Week"]).default("4 days")
    })
});

export type WeatherElement = z.infer<typeof WeatherElementSchema>;
