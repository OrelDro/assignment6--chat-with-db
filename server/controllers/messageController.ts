import {Request, Response} from 'express';
import * as MessageService from "../services";

export async function getMessages(req: Request,res: Response) {
    try {
        const result = await MessageService.getMessages();
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}