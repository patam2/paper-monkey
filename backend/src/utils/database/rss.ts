import { db } from './client';


export async function getRssUrls(userid: number): Promise<{ user_id: number; url: string; }[]> {
    try {
        return await db.selectFrom('rss').where('user_id', '=', userid).selectAll().execute() 
    } catch (err) {
        throw err
    }
}

export async function addRssUrl(userid:number, url: string) {
    try {
        return await db.insertInto('rss').values({user_id: userid, url: url}).execute()
    } catch (err) {
        throw err
    }    
}