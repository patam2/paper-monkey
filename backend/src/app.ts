import express from "express";
import apiRouter from "./routes/Auth";
import { newsletterRouter } from "./routes/Newsletter";
//import { rssRouter } from "./routes/Rss";
import RedisClient from "./utils/database/redis/redis-client";
import cors from 'cors'
const app = express();

import { Request } from "express";
import { CookieData } from "./models/authmodels";

export interface UserRequest extends Request {
    user?: CookieData
}

export const AppRedisClient = new RedisClient()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}))

app.use(express.json());
app.use("/auth", apiRouter)
app.use('/newsletter', newsletterRouter)
//app.use('/rss', rssRouter)

export default app