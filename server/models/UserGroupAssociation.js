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
const Group_1 = require("../models/Group");
const Db = require("../db");
const associationDb = new Db.Db();
const usersPathDb = '/users.json';
const groupsPathDb = '/groups.json';
const gUConnectionsPathDb = '/groupsUsersConnections.json';
class UserGroupAssociation {
    static deleteGroupAndChildrens(parentId) {
        return new Promise((resolve) => {
            const groups = associationDb.readFromJson(groupsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            const groupsConnection = associationDb.readFromJson(gUConnectionsPathDb);
            let queue = [parentId];
            delete groups["groups"][parentId];
            groupsConnection.forEach((element, idx) => {
                if (element.currentId === parentId) {
                    groupsConnection.splice(idx, 1);
                }
            });
            while (queue.length > 0) {
                const checkId = queue.shift();
                groupsConnection.forEach((element, idx) => {
                    if (checkId === element.parentId) {
                        queue.push(element.currentId);
                        element.currentType === "group" ? delete groups["groups"][element.currentId] : delete users["users"][element.currentId];
                        groupsConnection.splice(idx, 1);
                    }
                });
            }
            associationDb.writeToJson(groupsPathDb, groups);
            associationDb.writeToJson(usersPathDb, users);
            associationDb.writeToJson(gUConnectionsPathDb, groupsConnection);
            resolve(parentId);
        });
    }
    static deleteUserFromGroup(userId, groupId) {
        return new Promise((resolve) => {
            const groupsConnection = associationDb.readFromJson(gUConnectionsPathDb);
            groupsConnection.forEach((element, idx) => {
                if (userId === element.currentId && groupId === element.parentId) {
                    groupsConnection.splice(idx, 1);
                    associationDb.writeToJson(gUConnectionsPathDb, groupsConnection);
                    resolve(1);
                }
            });
            resolve("user/group doe/'snt exist");
        });
    }
    static buildTree() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let queue = [], tree = {};
            const groups = associationDb.readFromJson(groupsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            const root = yield this.findRoot();
            queue.push(root);
            while (queue.length) {
                const checkingItem = queue.shift();
                //this.findNodeById(tree,checkingItem.parentId);
                if (checkingItem.currentType === "user") {
                    tree[checkingItem.currentId] = ({ "currentId": checkingItem.currentId, "parentId": checkingItem.parentId, "name": users["users"][checkingItem.currentId]["UserName"], "type": "user" });
                }
                else {
                    tree[checkingItem.currentId] = ({ "currentId": checkingItem.currentId, "parentId": checkingItem.parentId, "name": groups["groups"][checkingItem.currentId]["groupName"], "type": "group", "items": [] });
                }
                for (const item in gUConnections) {
                    if (gUConnections[item].parentId === checkingItem.currentId) {
                        queue.push(gUConnections[item]);
                    }
                }
            }
            resolve(tree);
        }));
    }
    static nextTree(tree) {
        return new Promise((resolve) => {
            let root;
            for (let i in tree) {
                if (tree[i].parentId !== "null") {
                    tree[tree[i].parentId].items.push(tree[i]);
                }
            }
            for (let i in tree) {
                if (tree[i].parentId === "null") {
                    root = tree[i];
                }
            }
            resolve(root);
        });
    }
    static findNodeById(tree, id) {
        let queue = [tree[0]];
        while (queue.length) {
            const checkNode = queue.shift();
            if (checkNode.id === id) {
                return checkNode;
            }
            for (var i in checkNode.items) {
                queue.push(checkNode.items[i]);
            }
        }
        return null;
    }
    static findRoot() {
        return new Promise((resolve) => {
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            gUConnections.forEach((element) => {
                if (element.parentId === "null") {
                    resolve(element);
                }
            });
        });
    }
    static addUserToGroup(userId, groupId) {
        return new Promise((resolve, reject) => {
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            const groups = associationDb.readFromJson(groupsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            if (User_1.default.findUserInUsers(userId, users["users"]) && Group_1.default.findGroupInGroups(groupId, groups["groups"])) {
                gUConnections.push({ "parentId": groupId,
                    "currentId": userId,
                    "currentType": "user" });
                associationDb.writeToJson(gUConnectionsPathDb, gUConnections);
                resolve({ "userId": userId, "groupId": groupId });
            }
            reject("userId or groupId not exist");
        });
    }
    static getUsersInGroup(groupId) {
        return new Promise((resolve, reject) => {
            let usersArray = [];
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            gUConnections.forEach((element) => {
                if (element.parentId === groupId && element.currentType === "user") {
                    usersArray.push(Object.assign({ "id": element.currentId }, users["users"][element.currentId]));
                }
            });
            resolve(usersArray);
        });
    }
}
exports.default = UserGroupAssociation;
//# sourceMappingURL=UserGroupAssociation.js.map