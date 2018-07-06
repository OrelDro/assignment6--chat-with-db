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
//import Group from "../models/Group";
//import { v4 as uuid } from 'uuid';
const Group_1 = require("../models/Group");
function getGroupsList() {
    return new Promise((resolve, reject) => {
        Group_1.default.find(null, { __v: 0 }).then((groupsList) => {
            resolve(groupsList);
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.getGroupsList = getGroupsList;
function deleteGroup(id) {
    return new Promise((resolve, reject) => {
        Group_1.default.deleteMany({ $or: [{ _id: id }, { parentId: id }, { "childrens.items": id }] }).then((deletedGroup) => {
            resolve(deletedGroup);
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.deleteGroup = deleteGroup;
function addGroup(parentId, newGroupName) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const group = new Group_1.default({ name: newGroupName, parentId: parentId });
        group.save().then((newGroup) => {
            if (parentId) {
                Group_1.default.findById({ _id: parentId }).then((groupF) => {
                    groupF.childrens.kind = "Group";
                    groupF.childrens.items.push(newGroup._id.toString());
                    groupF.save();
                });
            }
            resolve(newGroup);
        }).catch((e) => {
            reject(e);
        });
    }));
}
exports.addGroup = addGroup;
//# sourceMappingURL=groupService.js.map