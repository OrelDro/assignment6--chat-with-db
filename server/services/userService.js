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
function getUsersList() {
    return new Promise((resolve, reject) => {
        User_1.default.find(null, { password: 0, __v: 0 }).then((usersList) => {
            resolve(usersList);
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.getUsersList = getUsersList;
function addUser(newUser) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const user = new User_1.default(newUser);
        user.save().then((userAdded) => {
            const returnUser = {
                _id: userAdded._id,
                username: userAdded.username,
                age: userAdded.age,
            };
            resolve(returnUser);
        }).catch((e) => {
            reject(e);
        });
    }));
}
exports.addUser = addUser;
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        User_1.default.findOneAndDelete({ _id: id }, { projection: { password: 0, __v: 0 } }).then((deletedUser) => {
            resolve(deletedUser);
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.deleteUser = deleteUser;
function updateUser(user) {
    return new Promise((resolve, reject) => {
        User_1.default.findOneAndUpdate({ _id: user.id }, { username: user.username, password: user.password, age: user.age }, { new: true, projection: { password: 0, __v: 0 } }).then((userUpdated) => {
            resolve(userUpdated);
        }).catch((e) => { reject(e); });
    });
}
exports.updateUser = updateUser;
function Login(username, password) {
    return new Promise((resolve, reject) => {
        User_1.default.find({ username: username, password: password }, { password: 0, __v: 0 }).then((userFind) => {
            if (userFind.length > 0) {
                resolve(userFind);
            }
            else {
                resolve({ status: "username or password are wrong" });
            }
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.Login = Login;
//# sourceMappingURL=userService.js.map