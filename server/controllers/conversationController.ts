import {Request, Response} from 'express';
import * as conversationService from '../services';


export async function getConversation(req: Request,res: Response) {
    try {
        const result = await conversationService.getConversation(req.body);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function setMessages(req: Request,res: Response) {
    try {
        const result = await conversationService.saveMessage(req.body);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}