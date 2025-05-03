import { Database } from "./types";
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from "kysely";


const dotenv = require('dotenv');
dotenv.config();

const dialect = new PostgresDialect({
    pool: new Pool({
        database: 'mail',
        host: 'localhost',
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PW,
        port: 5432
    })  
})


export const db = new Kysely<Database>({dialect})