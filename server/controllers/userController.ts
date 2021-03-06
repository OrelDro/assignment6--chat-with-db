import {Request, Response} from 'express';

import * as UserService from '../services';


export async function getUserList(req: Request,res: Response) {
    try {
        const result = await UserService.getUsersList();
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function Login(req: Request, res: Response) {
    try {
        const result = await UserService.Login(req.body.UserName, req.body.Password);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function addUser(req: Request,res: Response) {
    try {
        const result = await UserService.addUser(req.body.UserName, req.body.Password, req.body.age);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}

export async function deleteUser(req: Request,res: Response) {
    try {
        const result = await UserService.deleteUser(req.body.id);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}
export async function updateUser(req: Request,res: Response) {
    try {
        const result = await UserService.updateUser(req.body.id,req.body.UserName,req.body.password,req.body.age);
        res.json(result);
    }
    catch(e) {
        res.status(500).send(`error occur ==> ${e}`);
    }
}


