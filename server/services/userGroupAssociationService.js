"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserGroupAssociation_1 = require("../models/UserGroupAssociation");
function buildTree() {
    return new Promise((resolve) => {
        UserGroupAssociation_1.default.buildTree().then((result) => {
            UserGroupAssociation_1.default.nextTree(result).then((root) => {
                const rootArray = [root];
                resolve(rootArray);
            });
        });
    });
}
exports.buildTree = buildTree;
function addUserToGroup(userId, groupId) {
    return new Promise((resolve) => {
        UserGroupAssociation_1.default.addUserToGroup(userId, groupId).then((res) => {
            resolve(res);
        }).catch((e) => { throw new Error(e); });
    });
}
exports.addUserToGroup = addUserToGroup;
function deleteUserFromGroup(userId, groupId) {
    return new Promise((resolve) => {
        UserGroupAssociation_1.default.deleteUserFromGroup(userId, groupId).then((res) => {
            resolve(res);
        }).catch((e) => { throw new Error(e); });
    });
}
exports.deleteUserFromGroup = deleteUserFromGroup;
function getUsersInGroup(groupId) {
    return new Promise((resolve) => {
        UserGroupAssociation_1.default.getUsersInGroup(groupId).then((res) => {
            resolve(res);
        }).catch((e) => { throw new Error(e); });
    });
}
exports.getUsersInGroup = getUsersInGroup;
function deleteGroupChildrens(parentId) {
    return new Promise((resolve) => {
        UserGroupAssociation_1.default.deleteGroupAndChildrens(parentId).then((res) => {
            resolve(res);
        }).catch((e) => { throw new Error(e); });
    });
}
exports.deleteGroupChildrens = deleteGroupChildrens;
//# sourceMappingURL=userGroupAssociationService.js.map