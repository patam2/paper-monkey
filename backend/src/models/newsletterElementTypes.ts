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
        "forecastDuration": "Tomorrow" | "3-days" | "Week"
    }
}