"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const Group_1 = require("../models/Group");
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
    return new Promise((resolve, reject) => {
        const user = new User_1.default(newUser);
        user.save().then((returnUser) => {
            resolve(returnUser);
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.addUser = addUser;
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        User_1.default.findOneAndDelete({ _id: id }, { projection: { password: 0, __v: 0 } }).then((deletedUser) => {
            Group_1.default.update({ items: deletedUser._id }, { $pullAll: { items: [deletedUser._id] } }).then((res) => {
                if (res) {
                    resolve(deletedUser);
                }
            });
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.deleteUser = deleteUser;
function updateUser(user) {
    return new Promise((resolve, reject) => {
        User_1.default.findOneAndUpdate({ _id: user._id }, { username: user.username, password: user.password, age: user.age, type: "User" }, { new: true, projection: { password: 0, __v: 0 } }).then((userUpdated) => {
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