import { db } from "./client";
import { User, NewUser } from "./types";



export async function insertUser(user: NewUser) {
    return await db.insertInto('users').values(user).returningAll().executeTakeFirstOrThrow()
}

export async function getUserByEmail(email:string): Promise<User | undefined> {
    return await db.selectFrom('users').where('email', '=', email).selectAll().executeTakeFirst()
}