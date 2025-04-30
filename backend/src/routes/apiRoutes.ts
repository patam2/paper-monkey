import { Router, Request, Response,  } from "express";


const router = Router();


function handleGetReq(req: Request, res: Response): void {
    res.send('Hello world!')
}

router.get('/', handleGetReq)


export default router