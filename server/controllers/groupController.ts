import {Request, Response} from 'express';
import * as GroupService from "../services";

export async function getGroupList(req: Request,res: Response) {
    try {
        const result = await GroupService.getGroupsList();
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function deleteGroup(req: Request,res: Response) {
    try {
        const result = await GroupService.deleteGroup(req.body.id);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function addGroup(req: Request,res: Response) {
    try {
        const result = await GroupService.addGroup(req.body.parentGroupId, req.body.newGroupName);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

