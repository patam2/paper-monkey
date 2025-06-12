import { RSSFeedElement } from "../../models/newsletterElementTypes";
import { AppRedisClient } from "../../app";

import Parser from 'rss-parser';


const parser = new Parser()
type RSSFeedItems = Awaited<ReturnType<typeof parser.parseURL>>['items'];

function createRSSHtml(siteTitle: string, site: string, posts: RSSFeedItems): string {
    let html = `
        <div class="fw">
        <div>
            <h3>RSS feed summary for <a href=${site}>${siteTitle}</a></h3>
        </div>
        <div class="flex col">`;

    posts.map((post) => {
        html += `<div><a href="${post.link}"><h5>${post.title}</h5></a></div>`
    })
        
    html += `
        </div>
        </div>`;

    return html;
}

//Check cache first for the RSS summary of page. If yes, the latest fetch was <1 hour ago.
//If found, return the cached summary. If not, fetch and generate and then store the summary.


//Summarize should eventually be renamed to "limit to". 
export async function getRssSummary({site, siteTitle, summarize}: RSSFeedElement["settings"]): Promise<string | undefined> {
    try {
        var result = await AppRedisClient.getString(site)
    } catch (error) {
        console.error("Error in getRssSummary", error)
        return "Error fetching for site " + siteTitle
    }
    if (result) return result

    const feed = await parser.parseURL(site)
    ///console.log(feed.items)
    feed.items.filter((key) => {
        var d = new Date();
        d.setDate(d.getDate() - 1)
        const postDate = new Date(key.isoDate!)
        console.log(d, postDate)
        return postDate > d
    })
    console.log(feed.items)
    const sliced = feed.items.slice(0, parseInt(summarize, 10))
    console.log(sliced)
    return createRSSHtml(siteTitle, site, sliced)
}