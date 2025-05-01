import { Request, Response,  NextFunction} from "express";
import { AppRedisClient } from "../../app";
import { UserRequest } from "../../app";

export default function cookieCheckingMiddleware(req: Request, res: Response, next: NextFunction): void {
    if (!req.cookies.user) {
        res.status(403).send({'error': "No permissions"})
        return
    }
    AppRedisClient.getValue(req.cookies.user).then((resp) => {  
        if (!resp) {
            res.status(403).send({'error': 'No permissions'})
            return
        }; 
        (req as UserRequest).user = resp;
    });

    next()

}