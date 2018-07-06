"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const uuid_1 = require("uuid");
function getUsersList() {
    return new Promise((resolve, reject) => {
        User_1.default.getUsers().then((usersList) => {
            const usersArray = [];
            for (const user in usersList["users"]) {
                delete (usersList["users"][user].Password);
                usersArray.push(Object.assign({ "id": user }, usersList["users"][user]));
            }
            resolve(usersArray);
        });
    });
}
exports.getUsersList = getUsersList;
function Login(username, password) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        User_1.default.Login(username, password).then((userLogin) => {
            delete userLogin["Password"];
            resolve(userLogin);
        });
    }));
}
exports.Login = Login;
function addUser(username, password, age) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const id = uuid_1.v4();
        const user = new User_1.default(id, username, password, age);
        const userRegistered = yield user.addUser(user);
        delete userRegistered["Password"];
        resolve(userRegistered);
    }));
}
exports.addUser = addUser;
function deleteUser(id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const userDelete = yield User_1.default.deleteUser(id);
        User_1.default.deleteUserInConnectionT(id);
        if (userDelete) {
            delete userDelete["Password"];
            resolve(userDelete);
        }
        else {
            reject(`userId ${id} not exist`);
        }
    }));
}
exports.deleteUser = deleteUser;
function updateUser(id, username, password, age) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const userUpdated = yield User_1.default.updateUser(id, username, password, age);
        if (userUpdated) {
            delete userUpdated["Password"];
            resolve(userUpdated);
        }
        else {
            reject(`userId ${id} not exist`);
        }
    }));
}
exports.updateUser = updateUser;
//# sourceMappingURL=userService.js.map