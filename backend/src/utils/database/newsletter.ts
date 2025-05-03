import { Newsletter, NewNewsletter, UpdateNewsletter, NewsletterElementType } from './types';
import { db } from './client';

export async function getNewslettersByUserId(userId: number): Promise<Newsletter[] | null> {
  try {
    return await db.selectFrom('newsletters').where('userid', '=', userId).selectAll().execute();
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function getNewsletterByNewsletterId(newsletterId: number): Promise<Newsletter | undefined> {
  try {
    return await db.selectFrom('newsletters').where('id', '=', newsletterId).selectAll().executeTakeFirst();
  } catch (err) {
    console.error(err);
    throw err
  }
}

export async function updateNewsletterById(newsletterId: number, userid: number, name:string, utctime: string, newsletterElements: NewsletterElementType) {
  try {
    return await db.updateTable('newsletters')
    .set({name: name, utctime: utctime, configuration: JSON.stringify(newsletterElements) })
    .where('id', '=', newsletterId)
    .where('userid', '=', userid)
    .executeTakeFirst();
  } catch (err) {
    console.error(err);
    throw err
  }
}

export async function addJobIdToNewsletter(newsletterId: number) {
  try {
    return await db.updateTable('newsletters').set({'bulljobid': "newsletterid:" + newsletterId.toString()}).where('id', '=', newsletterId).executeTakeFirst()
  } catch (err) {
    console.error(err)
    throw err
  }
  
}

export async function createNewNewsletter(userId: number): Promise<{id: number} | undefined> {
  try{
    return await db.insertInto('newsletters').values(
      {
          'userid': userId,
          'name': 'Newsletter',
          'bulljobid': "",
          'utctime': "23:59:59",
          'configuration': JSON.stringify({'newsletter_elements': []})
      }).returning(['id']).executeTakeFirst()
  } catch (err) {
    console.error(err);
    throw err
  }
}