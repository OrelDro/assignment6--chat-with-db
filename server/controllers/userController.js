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
const UserService = require("../services");
function getUserList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield UserService.getUsersList();
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.getUserList = getUserList;
function Login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield UserService.Login(req.body.UserName, req.body.Password);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.Login = Login;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield UserService.addUser(req.body.UserName, req.body.Password, req.body.age);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.addUser = addUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield UserService.deleteUser(req.body.id);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.deleteUser = deleteUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield UserService.updateUser(req.body.id, req.body.UserName, req.body.password, req.body.age);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=userController.js.map