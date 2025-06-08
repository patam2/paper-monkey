import { Request, Response,  NextFunction} from "express";
import { AppRedisClient } from "../../app";
import { UserRequest } from "../../app";
import { CookieData } from "../../models/authmodels";

export default async function cookieCheckingMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.cookies) {
        console.log('Middleware failing request due to cookies not being included. ')
        res.status(403).send({'error': "No permissions"})
        return
    }
    if (!('user' in req.cookies)) {
        res.status(403).send({'Error': "No permissions"})
        return
    }
    const resp = await AppRedisClient.getObject<CookieData>(req.cookies.user) 
    if (!resp) {
        res.status(403).send({'error': 'No permissions because no response..'})
        return
    }; 
    (req as UserRequest).user = resp;
    next()
}