"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Db = require("../db");
const groupDb = new Db.Db();
const groupPathDb = '/groups.json';
const gUConnectionsPathDb = '/groupsUsersConnections.json';
class Group {
    constructor(id, groupName) {
        this.id = id;
        this.groupName = groupName;
    }
    static addGroup(newGroup, parentId) {
        return new Promise((resolve, reject) => {
            const groups = groupDb.readFromJson(groupPathDb);
            const groupsConnection = groupDb.readFromJson(gUConnectionsPathDb);
            groups["groups"][newGroup.id] = {
                "groupName": newGroup.groupName
            };
            groupsConnection.push({ "parentId": parentId,
                "currentId": newGroup.id,
                "currentType": "group" });
            if (!groups) {
                reject("error Get Groups");
            }
            groupDb.writeToJson(groupPathDb, groups);
            groupDb.writeToJson(gUConnectionsPathDb, groupsConnection);
            resolve(newGroup);
        });
    }
    static getGroups() {
        return new Promise((resolve, reject) => {
            const groups = groupDb.readFromJson(groupPathDb);
            if (!groups) {
                reject("error Get Groups");
            }
            resolve(groups);
        });
    }
    static deleteGroup(groupId) {
        return new Promise((resolve, reject) => {
            const groups = groupDb.readFromJson(groupPathDb);
            const groupToDelete = this.findGroupInGroups(groupId, groups["groups"]);
            if (groupToDelete) {
                delete groups["groups"][groupId];
                groupDb.writeToJson(groupPathDb, groups);
                resolve(new Group(groupId, groupToDelete.groupName));
            }
            else {
                reject(`groupId ${groupId} not exist`);
            }
        });
    }
    static deleteGroupInConnectionT(id) {
        const groupsConnection = groupDb.readFromJson(gUConnectionsPathDb);
        groupsConnection.forEach((element, idx) => {
            if (element.currentId === id) {
                groupsConnection.splice(idx, 1);
            }
        });
        groupDb.writeToJson(gUConnectionsPathDb, groupsConnection);
    }
    static findGroupInGroups(id, groups) {
        return groups[id];
    }
}
const groupSchema = mongoose.Schema({
    name: String,
    parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
    childrens: {
        kind: String,
        items: [{ type: mongoose.Schema.Types.ObjectId, refPath: 'childrens.kind' }]
    }
});
exports.default = mongoose.model('Group', groupSchema);
//export default Group;
//# sourceMappingURL=Group.js.map