import { WeatherElement } from "./weather/weatherTypes"
import { RSSElement } from "./rss/rssTypes"

export interface NewsletterItemProps {
    item: WeatherElement | RSSElement,
    index: number,
    deleteFunction: (index: number) => void
}
