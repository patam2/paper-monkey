import {
    ColumnType,
     Generated,
      Insertable,
       JSONColumnType,
        Selectable,
         Updateable
 } from "kysely";


export interface Database {
    users: UserTable;
}

export interface UserTable {
    user_id: Generated<number>
    email: string,
    name: string,
    password: string,
    created_at: Generated<ColumnType<Date>>
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
