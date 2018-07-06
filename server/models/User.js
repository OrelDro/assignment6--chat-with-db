"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Db = require("../db");
const userDb = new Db.Db();
const userPathDb = '/users.json';
const gUConnectionsPathDb = '/groupsUsersConnections.json';
class User {
    constructor(id, username, password, age) {
        this.id = id;
        this.UserName = username;
        this.Password = password;
        this.age = age;
    }
    static getUsers() {
        return new Promise((resolve) => {
            const users = userDb.readFromJson(userPathDb);
            resolve(users);
        });
    }
    static Login(userName, password) {
        return new Promise((resolve) => {
            const users = userDb.readFromJson(userPathDb);
            const user = this.getUserByName(userName, users["users"]);
            if (user && user.Password === password) {
                resolve(user);
            }
            resolve(false);
        });
    }
    addUser(user) {
        return new Promise((resolve, reject) => {
            const users = userDb.readFromJson(userPathDb);
            users["users"][user.id] = {
                "UserName": user.UserName,
                "Password": user.Password,
                "age": user.age
            };
            userDb.writeToJson('/users.json', users);
            resolve(user);
        });
    }
    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            const users = userDb.readFromJson(userPathDb);
            const userToDelete = this.findUserInUsers(id, users["users"]);
            if (userToDelete) {
                delete users["users"][id];
                userDb.writeToJson(userPathDb, users);
                resolve(Object.assign({ "id": id }, userToDelete));
            }
            else {
                reject(`userId ${id} not exist`);
            }
        });
    }
    static deleteUserInConnectionT(id) {
        const usersConnection = userDb.readFromJson(gUConnectionsPathDb);
        usersConnection.forEach((element, idx) => {
            if (element.currentId === id) {
                usersConnection.splice(idx, 1);
            }
        });
        userDb.writeToJson(gUConnectionsPathDb, usersConnection);
    }
    static updateUser(id, username, password, age) {
        return new Promise((resolve, reject) => {
            const users = userDb.readFromJson(userPathDb);
            const userToUpdate = this.findUserInUsers(id, users["users"]);
            if (userToUpdate) {
                users["users"][id].UserName = username;
                users["users"][id].Password = password;
                users["users"][id].age = age;
                userDb.writeToJson(userPathDb, users);
                resolve(Object.assign({ "id": id }, userToUpdate));
            }
            else {
                reject(`userId ${id} not exist`);
            }
        });
    }
    static findUserInUsers(id, users) {
        return users[id];
    }
    static getUserByName(username, users) {
        for (const user in users) {
            if (users[user].UserName === username) {
                return Object.assign({ "id": user }, users[user]);
            }
        }
    }
}
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    age: Number
});
exports.default = mongoose.model('User', userSchema);
//export default User;
//# sourceMappingURL=User.js.map