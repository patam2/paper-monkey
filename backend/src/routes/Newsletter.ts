import { Router, Response, Request} from "express";
import { updateNewsletterById, createNewNewsletter, getNewsletterByNewsletterId } from "../utils/database/newsletter";
import cookieCheckingMiddleware from "../utils/cookies/cookie-middleware";
import { UserRequest } from "../app";
import { NewsletterSchema } from '../models/newsletterElementTypes';



export const newsletterRouter = Router()
newsletterRouter.use(cookieCheckingMiddleware)

async function getNewsletter(res: Response, req: Request) {
    if (!req.body) {
        res.send({ errors: 'Invalid JSON'});
        return;
    }
    const requestNewsletterId = Number(req.params.id)
    const newsletter = await getNewsletterByNewsletterId(requestNewsletterId)
    if (!newsletter) {
        res.status(404);
        return
    }
    if (typeof newsletter.userid !== 'undefined' && typeof (req as UserRequest).user?.userid !== undefined) {
        res.status(403);
        return
    }
    if (newsletter?.userid !== (req as UserRequest).user?.userid) {
        res.status(403);
        return
    }

    res.status(200).send(newsletter)
}

async function updateNewsletter(res: Response, req: Request) {
    const result = NewsletterSchema.safeParse(req.body)
    if (!result.success) {
        res.status(500).send({'errors': 'Invalid form data.'})
    }
    const newsletterId = Number(req.params.id)

    

}

async function createNewsletter(){

    //const res = await createNewNewsletter()
}

newsletterRouter.post('/newsletter/:id', updateNewsletter)
newsletterRouter.get('/newsletter/:id', getNewsletter)