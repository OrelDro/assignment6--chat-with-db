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
const GroupService = require("../services");
function getGroupList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield GroupService.getGroupsList();
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.getGroupList = getGroupList;
function deleteGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield GroupService.deleteGroup(req.body.id);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.deleteGroup = deleteGroup;
function addGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield GroupService.addGroup(req.body.parentGroupId, req.body.newGroupName);
            res.json(result);
        }
        catch (e) {
            res.status(500).send(`error occur ==> ${e}`);
        }
    });
}
exports.addGroup = addGroup;
//# sourceMappingURL=groupController.js.map