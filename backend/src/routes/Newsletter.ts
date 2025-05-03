import { Router, Response, Request} from "express";
import { updateNewsletterById, createNewNewsletter, getNewsletterByNewsletterId, getNewslettersByUserId, addJobIdToNewsletter } from "../utils/database/newsletter";
import cookieCheckingMiddleware from "../utils/cookies/cookie-middleware";
import { UserRequest } from "../app";
import { NewsletterSchema } from '../models/newsletterElementTypes';

//const { addNewNewsletter } = require('../bull/newsletter-queue')
import { addNewNewsletter } from "../bull/newsletter-queue";
var cookieParser = require('cookie-parser')


export const newsletterRouter = Router()
newsletterRouter.use(cookieParser())
newsletterRouter.use(cookieCheckingMiddleware)

async function getNewsletter(req: Request, res: Response) {
    if (req.params.id === "all") {
        getNewsletterByUser(req, res)
        return
    }
    else {
        try {
            var requestNewsletterId = Number(req.params.id)
        } catch {
            res.status(500).send({error: "Invalid id"})
            return
        }    
    }

    try {
        var newsletter = await getNewsletterByNewsletterId(requestNewsletterId)
    } catch {
        res.status(500).send('Internal server error')
    }
    if (!newsletter) {
        res.status(404).send({'error': "Newsletter not found"});
        return
    }
    if (typeof newsletter.userid === 'undefined' || typeof (req as UserRequest).user?.userid === undefined) {
        res.status(403).send({'error': "Missing fields"});
        return
    }
    if (newsletter?.userid !== (req as UserRequest).user?.userid) {
        res.status(403).send({'error': "Authentication mismatch"});
        return
    }

    res.status(200).send(newsletter)
}

async function updateNewsletter(req: Request, res: Response) {
    console.log('Received newsletter update request')
    const result = NewsletterSchema.safeParse(req.body)
    
    if (!result.success) {
        console.log(result, 'line 40')
        res.status(500).send({'errors': 'Invalid form data.'})
        return
    }
    const newsletterId = Number(req.params.id)
    const uid = (req as UserRequest).user?.userid 
    if (uid) {
        const elementsToUpdate = {newsletter_elements: req.body.newsletter_elements};
        updateNewsletterById(newsletterId, uid, req.body.name, req.body.utctime, elementsToUpdate).then((resp) => {
            if (resp) {
                res.status(200).send()
            }
            else{
                res.status(500).send('Internal server error')
            }
        })
    }
    else {
        res.send(500).send('Internal server error')
    }
}

async function createNewsletter(req: Request, res: Response){
    const uid = (req as UserRequest).user!.userid 
    if (uid) {
        try {
            var resp = await createNewNewsletter(uid)
            const qId = await addNewNewsletter(resp!.id)
            await addJobIdToNewsletter(resp!.id)
            
        } catch (err) {
            console.error(err)
            res.status(500).send({'error': err})
            return
        }
        res.status(200).send({"newsletterId": resp})
    }
}


async function getNewsletterByUser(req: Request, res: Response) {

    const uid = (req as UserRequest).user!.userid 
    if (!uid) {
        res.status(500).send('Internal server error')
        return
    }
    try {
        var newsletters = await getNewslettersByUserId(uid)
    } catch {
        res.status(500).send('Internal server error')
        return
    }
    res.status(200).send({"newsletters": newsletters})
}


newsletterRouter.post('/:id', updateNewsletter)
newsletterRouter.get('/:id', getNewsletter)
newsletterRouter.get('/all', getNewsletterByUser)
newsletterRouter.put('/', createNewsletter)