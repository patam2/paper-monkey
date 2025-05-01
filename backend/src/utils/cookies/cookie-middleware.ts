import { Request, Response,  NextFunction} from "express";
import { AppRedisClient } from "../../app";
import { UserRequest } from "../../app";

export default async function cookieCheckingMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.cookies) {
        res.status(403).send({'error': "No permissions"})
        return
    }
    const resp = await AppRedisClient.getValue(req.cookies.user) 
    console.log(resp, req.cookies.user)
    if (!resp) {
        res.status(403).send({'error': 'No permissions because no response..'})
        return
    }; 
    (req as UserRequest).user = resp;
    next()
}