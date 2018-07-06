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
const userGroupAssociationService = require("../services");
function getTree(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userGroupAssociationService.buildTree();
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.getTree = getTree;
function addUserToGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userGroupAssociationService.addUserToGroup(req.body.userId, req.body.groupId);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.addUserToGroup = addUserToGroup;
function deleteGroupChildrens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userGroupAssociationService.deleteGroupChildrens(req.body.id);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.deleteGroupChildrens = deleteGroupChildrens;
function deleteUserFromGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userGroupAssociationService.deleteUserFromGroup(req.body.id.userId, req.body.id.groupId);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.deleteUserFromGroup = deleteUserFromGroup;
function getUsersInGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield userGroupAssociationService.getUsersInGroup(req.params.groupId);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.getUsersInGroup = getUsersInGroup;
//# sourceMappingURL=userGroupAssociationController.js.map