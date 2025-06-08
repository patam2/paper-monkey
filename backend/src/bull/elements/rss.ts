import { RSSFeedElement } from "../../models/newsletterElementTypes";
import { AppRedisClient } from "../../app";

import Parser from 'rss-parser';


const parser = new Parser()
//Check cache first for the RSS summary of page. If yes, the latest fetch was <1 hour ago.
//If found, return the cached summary. If not, fetch and generate and then store the summary.
export async function getRssSummary({site, siteTitle, summarize}: RSSFeedElement["settings"]): Promise<string | undefined> {
    try {
        var result = await AppRedisClient.getString(site)
    } catch (error) {
        console.error("Error in getRssSummary", error)
        return "Error fetching for site " + siteTitle
    }
    if (result) return result

    const feed = await parser.parseURL(site)
    console.log(feed.title)
}