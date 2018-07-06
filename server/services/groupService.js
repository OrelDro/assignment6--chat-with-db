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
const Group_1 = require("../models/Group");
const uuid_1 = require("uuid");
function getGroupsList() {
    return new Promise((resolve, reject) => {
        Group_1.default.getGroups().then((groupsList) => {
            const groupsArray = [];
            for (const group in groupsList["groups"]) {
                groupsArray.push(Object.assign({ "id": group }, groupsList["groups"][group]));
            }
            resolve(groupsArray);
        });
    });
}
exports.getGroupsList = getGroupsList;
function deleteGroup(id) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const groupDelete = yield Group_1.default.deleteGroup(id);
        Group_1.default.deleteGroupInConnectionT(id);
        if (groupDelete) {
            resolve(groupDelete);
        }
        else {
            reject(`groupId ${id} not exist`);
        }
    }));
}
exports.deleteGroup = deleteGroup;
function addGroup(parentId, newGroupName) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const id = uuid_1.v4();
        const newGroup = new Group_1.default(id, newGroupName);
        const groupReturned = yield Group_1.default.addGroup(newGroup, parentId);
        if (groupReturned) {
            resolve(groupReturned);
        }
        else {
            reject(`groupId ${parentId} not exist`);
        }
    }));
}
exports.addGroup = addGroup;
//# sourceMappingURL=groupService.js.map