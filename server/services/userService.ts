import User from '../models/User';
import { v4 as uuid } from 'uuid';


export function getUsersList() {
    return new Promise( (resolve, reject) => {
        User.getUsers().then( (usersList) => {
            const usersArray = [];
            for(const user in usersList["users"]) {
                delete (usersList["users"][user].Password);
                usersArray.push({"id":user,...usersList["users"][user]})
            }
            resolve(usersArray);
        })
    })
}

export function Login(username:string, password: string) {
    return new Promise( async (resolve, reject) => {
        User.Login(username,password).then( (userLogin) => {
            delete userLogin["Password"];
            resolve(userLogin);
        })
    })
}

export function addUser(username:string, password:string, age:number) {
    return new Promise( async (resolve, reject) => {
        const id = uuid();
        const user = new User(id,username,password,age);
        const userRegistered = await user.addUser(user);
        delete userRegistered["Password"];
        resolve(userRegistered);
    })
}

export function deleteUser(id: string) {
    return new Promise( async (resolve, reject) => {
        const userDelete = await User.deleteUser(id);
        User.deleteUserInConnectionT(id);
        if(userDelete) {
            delete userDelete["Password"];
            resolve(userDelete);
        }
        else {
            reject (`userId ${id} not exist`);
        }
    })
}

export function updateUser(id: string, username:string, password:string, age: number) {
    return new Promise( async (resolve, reject) => {
        const userUpdated = await User.updateUser(id, username,password, age);
        if(userUpdated) {
            delete userUpdated["Password"];
            resolve(userUpdated);
        }
        else {
            reject (`userId ${id} not exist`);
        }

    })
}

