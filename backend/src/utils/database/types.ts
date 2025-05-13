import {
    ColumnType,
     Generated,
      Insertable,
       JSONColumnType,
        Selectable,
         Updateable
 } from "kysely";


import { RSSFeedElement, WeatherElement } from "../../models/newsletterElementTypes";

export interface Database {
    users: UserTable;
    newsletters: NewsletterTable;
    rss: RSSTable
}

export interface UserTable {
    user_id: Generated<number>
    email: string,
    name: string,
    password: string,
    created_at: Generated<ColumnType<Date>>
}

export interface NewsletterElementType 
    {
        newsletter_elements: {
            "name": string,
            "id": string,
            "settings": (RSSFeedElement['settings'] | WeatherElement['settings'])
        }[]
    }

export interface NewsletterTable {
    id: Generated<number>,
    userid: number,
    name: string,
    utctime: string,
    bulljobid: string,
    configuration: JSONColumnType<NewsletterElementType>
}

export interface RSSTable {
    user_id: number,
    url: string
}

export type Newsletter = Selectable<NewsletterTable>
export type NewNewsletter = Insertable<NewsletterTable>
export type UpdateNewsletter = Updateable<NewsletterTable>

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
