import { Router, Response, Request} from "express";
import { updateNewsletterById, createNewNewsletter, getNewsletterByNewsletterId, getNewslettersByUserId } from "../utils/database/newsletter";
import cookieCheckingMiddleware from "../utils/cookies/cookie-middleware";
import { UserRequest } from "../app";
import { NewsletterSchema } from '../models/newsletterElementTypes';

var cookieParser = require('cookie-parser')


export const newsletterRouter = Router()
newsletterRouter.use(cookieParser())
newsletterRouter.use(cookieCheckingMiddleware)

async function getNewsletter(req: Request, res: Response) {
    const requestNewsletterId = Number(req.params.id)
    const newsletter = await getNewsletterByNewsletterId(requestNewsletterId)
    if (!newsletter) {
        res.status(404).send('404');
        return
    }
    if (typeof newsletter.userid === 'undefined' || typeof (req as UserRequest).user?.userid === undefined) {
        res.status(403).send('403 1');
        return
    }
    if (newsletter?.userid !== (req as UserRequest).user?.userid) {
        res.status(403).send('403 2');
        return
    }

    res.status(200).send(newsletter)
}

async function updateNewsletter(req: Request, res: Response) {
    const result = NewsletterSchema.safeParse(req.body)
    if (!result.success) {
        res.status(500).send({'errors': 'Invalid form data.'})
    }
    const newsletterId = Number(req.params.id)
    const uid = (req as UserRequest).user?.userid 
    if (uid) {
        updateNewsletterById(newsletterId, uid, req.body).then((resp) => {
            if (resp) {
                res.status(200).send()
            }
            else{
                res.status(500)
            }
        })
    }
    else {
        res.send(500)
    }
}

async function createNewsletter(req: Request, res: Response){
    const uid = (req as UserRequest).user!.userid 
    if (uid) {
        try {
            var resp = await createNewNewsletter(uid)
        } catch (err) {
            res.status(500).send({'error': err})
            return
        }
        res.status(200).send({"newsletterId": resp})
    }
}


async function getNewsletterByUser(req: Request, res: Response) {
    const uid = (req as UserRequest).user!.userid 
    if (!uid) {
        res.status(500)
        return
    }
    try {
        var newsletters = await getNewslettersByUserId(uid)
    } catch {
        res.status(500)
        return
    }
    res.status(200).send({"newsletters": newsletters})
}


newsletterRouter.post('/:id', updateNewsletter)
newsletterRouter.get('/:id', getNewsletter)
newsletterRouter.get('/all', getNewsletterByUser)
newsletterRouter.put('/:id', createNewsletter)