
import { z } from "zod"


export const RSSFeedElementSchema = z.object({
    id: z.literal("rss_feed"),
    name: z.literal("RSS feed"),
    settings: z.object({
        site: z.string().regex(new RegExp("^.*\.rss$"), "You have entered an incorrect URL").default("https://example.com/.rss"),
        siteTitle: z.string(),
        summarize: z.string().default("Yes")
    })
});


export type RSSElement = z.infer<typeof RSSFeedElementSchema>