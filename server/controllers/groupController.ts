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

export async function addUserToGroup(req: Request,res: Response) {
    try {
        const result = await GroupService.addUserToGroup(req.body.userId,req.body.groupId);
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

export async function deleteUserFromGroup(req: Request,res: Response) {
    try {
        const result = await GroupService.deleteUserFromGroup(req.body.userId,req.body.groupId);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function getTree(req: Request,res: Response) {
    try {
        const result = await GroupService.buildTree();
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

