import { Router, Response, Request} from "express";
import { updateNewsletterById, createNewNewsletter } from "../utils/database/newsletter";

export const newsletterRouter = Router()

async function getNewsletter(res: Response, req: Request) {
    if (!req.body) {
        res.send({ errors: 'Invalid JSON'});
        return;
    }
    const newsletter = Number(req.params.id)

}

async function postNewsletter(res: Response, req: Request) {
    if (!req.body) {
        res.send({ errors: 'Invalid JSON'});
        return;
    }
}

async function createNewsletter(){

    //const res = await createNewNewsletter()
}


newsletterRouter.get('/newsletter/:id', getNewsletter)