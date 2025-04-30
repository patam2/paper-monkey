import { Router, Request, Response } from "express";

import { LoginUser, SignUpUser } from "../models/authmodels";
const apiRouter = Router();



function handleLoginPostRequest(req: Request, res: Response): void {
    if (!req.body) {
        res.send({'errors': ""})
    }
    const userData = LoginUser.createFromForm(req.body) 
    if ('errors' in userData) {
        res.send({'errors': userData.errors})
    }
    res.send("Successful")
}


function handleSignupPostRequest(req: Request, res: Response): void {
    if (!req.body) {
        res.send({'errors': ""})
    }
    const userData = SignUpUser.createFromForm(req.body) 
    if ('errors' in userData) {
        res.send({'errors': userData.errors})
    }
    res.send("Successful")
}

apiRouter.post('/login', handleLoginPostRequest)
apiRouter.post('/signup', handleSignupPostRequest)


export default apiRouter