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
const User_1 = require("../models/User");
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
        Group_1.default.deleteMany({ $or: [{ _id: id }, { parentId: id }] }).then(() => {
            Group_1.default.update({ items: id }, { $pullAll: { items: [id] } }).then(g => {
                resolve(g);
            });
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.deleteGroup = deleteGroup;
function addUserToGroup(userId, groupId) {
    return new Promise((resolve, reject) => {
        Group_1.default.findById({ _id: groupId }).then((group) => {
            if (group.itemsType === "User" || group.itemsType === null) {
                group.itemsType = "User";
                group.items.push(userId);
                group.save();
                resolve(group);
            }
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.addUserToGroup = addUserToGroup;
function addGroup(parentId, newGroupName) {
    return new Promise((resolve, reject) => {
        const group = new Group_1.default({ name: newGroupName, parentId: parentId, type: "Group" });
        group.save().then((newGroup) => {
            if (parentId) {
                Group_1.default.findOne({ _id: parentId }).then((parentGroup) => {
                    parentGroup.items.push(newGroup._id.toString());
                    parentGroup.itemsType = "Group";
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
function deleteUserFromGroup(params) {
    return new Promise((resolve, reject) => {
        Group_1.default.update({ items: params.userId, _id: params.groupId }, { $pullAll: { items: [params.userId] } })
            .then((group) => {
            resolve(group);
        }).catch((e) => { reject(e); });
    });
}
exports.deleteUserFromGroup = deleteUserFromGroup;
function getUsersInGroup(groupId) {
    return new Promise((resolve, reject) => {
        Group_1.default.find({ _id: groupId }).populate("items")
            .exec((err, returnGroup) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(returnGroup);
            }
        });
    });
}
exports.getUsersInGroup = getUsersInGroup;
function buildTree() {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const users = yield getUsersInObj();
        const groups = yield getGroupsInObj();
        Group_1.default.findOne({ parentId: null }, { __v: 0 }).lean().then((root) => {
            const tree = build(root, groups, users);
            resolve([tree]);
        });
    }));
}
exports.buildTree = buildTree;
function build(treeObj, groups, users) {
    let obj = treeObj;
    const children = treeObj.items;
    if (children.length) {
        children.forEach((value, index) => {
            if (obj.itemsType == "Group") {
                obj.items[index] = build(groups[value], groups, users);
            }
            else {
                obj.items[index] = users[value];
            }
        });
    }
    return obj;
}
function getUsersInObj() {
    return new Promise((resolve, reject) => {
        let usersObj = {};
        User_1.default.find({}, { password: 0, __v: 0 }).lean().then((users) => {
            users.forEach((user) => {
                usersObj[user._id] = Object.assign({ "name": user.username }, user);
            });
            resolve(usersObj);
        }).catch((e) => {
            reject(e);
        });
    });
}
function getGroupsInObj() {
    return new Promise((resolve, reject) => {
        let groupsObj = {};
        Group_1.default.find({}, { __v: 0 }).lean().then((groupsList) => {
            groupsList.forEach((group) => {
                groupsObj[group._id] = group;
            });
            resolve(groupsObj);
        }).catch((e) => {
            reject(e);
        });
    });
}
//# sourceMappingURL=groupService.js.map