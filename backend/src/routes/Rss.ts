import { getRssUrls, addRssUrl } from "../utils/database/rss";
import { UserRequest } from "../app";
import { Router, Response, Request } from "express";
import cookieCheckingMiddleware from "../utils/cookies/cookie-middleware";
var cookieParser = require('cookie-parser')



export const rssRouter = Router();
rssRouter.use(cookieParser())
rssRouter.use(cookieCheckingMiddleware)


async function getRssUrlsByAuthenticatedUser(req: Request, res: Response) {
    const uid = (req as UserRequest).user!.userid 

    try {
        const databaseResult = await getRssUrls(uid)
        const urlsList = databaseResult.map(urlObject => urlObject.url)
        res.status(200).send({'urls': urlsList})
        return
    } catch (err) {
        res.status(500)
        console.error(err)
    }
}

rssRouter.get('/get', getRssUrlsByAuthenticatedUser)