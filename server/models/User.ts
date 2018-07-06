import * as mongoose from 'mongoose';

import * as Db from '../db';

const userDb = new Db.Db();
const userPathDb = '/users.json';
const gUConnectionsPathDb = '/groupsUsersConnections.json';

class User {
    private id: string;
    private UserName: string;
    private Password: string;
    private age: number;

    constructor(id:string, username: string, password: string, age: number) {
        this.id = id;
        this.UserName = username;
        this.Password = password;
        this.age = age;
    }
    public static getUsers() {
        return new Promise( (resolve) => {
            const users = userDb.readFromJson(userPathDb);
            resolve(users);
        })
    }

    public static Login(userName: string, password: string) {
        return new Promise( (resolve) => {
            const users = userDb.readFromJson(userPathDb);
            const user = this.getUserByName(userName,users["users"]);
            if(user && user.Password === password) {
                resolve(user);
            }
            resolve(false);
        })
    }

    public addUser(user: User) {
        return new Promise((resolve, reject) => {
            const users = userDb.readFromJson(userPathDb);
                users["users"][user.id] = {
                    "UserName":user.UserName,
                    "Password":user.Password,
                    "age":user.age
                };
                userDb.writeToJson('/users.json',users);
                resolve(user);
        })
    }

    public static deleteUser(id:string) {
        return new Promise( (resolve, reject) => {
            const users = userDb.readFromJson(userPathDb);
            const userToDelete = this.findUserInUsers(id,users["users"]);
            if(userToDelete) {
                delete users["users"][id];
                userDb.writeToJson(userPathDb,users);
                resolve({"id":id,...userToDelete});
            }
            else {
                reject (`userId ${id} not exist`);
            }
        })
    }

    public static deleteUserInConnectionT(id: string) {
        const usersConnection = userDb.readFromJson(gUConnectionsPathDb);
        usersConnection.forEach( (element,idx) => {
            if(element.currentId === id) {
                usersConnection.splice(idx,1);
            }
        })
        userDb.writeToJson(gUConnectionsPathDb,usersConnection);
    }

    public static updateUser(id:string,username:string,password:string,age:number) {
        return new Promise( (resolve, reject) => {
            const users = userDb.readFromJson(userPathDb);
            const userToUpdate = this.findUserInUsers(id,users["users"]);
            if(userToUpdate) {
                users["users"][id].UserName = username;
                users["users"][id].Password = password;
                users["users"][id].age = age;
                userDb.writeToJson(userPathDb,users);
                resolve({"id":id,...userToUpdate});
            }
            else {
                reject (`userId ${id} not exist`);
            }

        })
    }

    public static findUserInUsers(id: string, users:{}) {
        return users[id];
    }

    public static getUserByName(username:string, users:{}) {
        for(const user in users) {
            if(users[user].UserName === username) {
                return {"id":user, ...users[user]};
            }
        }
    }
}

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    age: Number
});

export default mongoose.model('User', userSchema);



//export default User;