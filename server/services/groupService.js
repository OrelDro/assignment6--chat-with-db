"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        Group_1.default.deleteMany({ $or: [{ _id: id }, { parentId: id }] }).then((deletedGroup) => {
            Group_1.default.update({ "childrens.item": id }, { $pullAll: { "childrens.item": [id] } });
            resolve(deletedGroup);
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.deleteGroup = deleteGroup;
function addUserToGroup(userId, groupId) {
    return new Promise((resolve, reject) => {
        Group_1.default.findById({ _id: groupId }).then((group) => {
            if (group.childrens.kind === "User" || group.childrens.kind === undefined) {
                group.childrens.kind = "User";
                group.childrens.item.push(userId);
                group.save();
                resolve(group);
            }
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.addUserToGroup = addUserToGroup;
//groupF.childrens.kind = "Group";
//groupF.childrens.items.push(newGroup._id.toString());
function addGroup(parentId, newGroupName) {
    return new Promise((resolve, reject) => {
        const group = new Group_1.default({ name: newGroupName, parentId: parentId });
        group.save().then((newGroup) => {
            if (parentId) {
                Group_1.default.findOne({ _id: parentId }).then((parentGroup) => {
                    parentGroup.childrens.push({ kind: "Group", item: newGroup._id.toString() });
                    parentGroup.save();
                });
            }
            resolve(newGroup);
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.addGroup = addGroup;
function deleteUserFromGroup(userId, groupId) {
    return new Promise((resolve, reject) => {
        Group_1.default.update({ "childrens.item": userId, _id: groupId }, { $pullAll: { "childrens.item": [userId] } })
            .then((group) => {
            resolve(group);
        }).catch((e) => { reject(e); });
    });
}
exports.deleteUserFromGroup = deleteUserFromGroup;
function buildTree() {
    return new Promise((resolve) => {
        Group_1.default.findOne({ parentId: null }, { __v: 0, childrens: [{ item: 0 }] })
            .populate({
            path: 'childrens.item',
            populate: { path: 'childrens.item' }
        }).exec((err, res) => {
            resolve(res);
        });
    });
}
exports.buildTree = buildTree;
//# sourceMappingURL=groupService.js.map