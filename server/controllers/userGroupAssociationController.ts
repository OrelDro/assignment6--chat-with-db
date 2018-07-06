import {Request, Response} from 'express';
import * as userGroupAssociationService from '../services';


export async function getTree(req: Request,res: Response) {
    try {
        const result = await userGroupAssociationService.buildTree();
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function addUserToGroup(req: Request,res: Response) {
    try {
        const result = await userGroupAssociationService.addUserToGroup(req.body.userId,req.body.groupId);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function deleteGroupChildrens(req: Request,res: Response) {
    try {
        const result = await userGroupAssociationService.deleteGroupChildrens(req.body.id);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function deleteUserFromGroup(req: Request,res: Response) {
    try {
        const result = await userGroupAssociationService.deleteUserFromGroup(req.body.id.userId,req.body.id.groupId);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function getUsersInGroup(req: Request,res: Response) {
    try {
        const result = await userGroupAssociationService.getUsersInGroup(req.params.groupId);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}
