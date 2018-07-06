import User from '../models/User';
import Group from '../models/Group';
import * as Db from '../db';

const associationDb = new Db.Db();
const usersPathDb = '/users.json';
const groupsPathDb = '/groups.json';
const gUConnectionsPathDb = '/groupsUsersConnections.json';


class UserGroupAssociation {

    public static deleteGroupAndChildrens(parentId:string) {
        return new Promise( (resolve) => {
            const groups = associationDb.readFromJson(groupsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            const groupsConnection = associationDb.readFromJson(gUConnectionsPathDb);
            let queue = [parentId];
            delete groups["groups"][parentId];
            groupsConnection.forEach( (element,idx) => {
                if(element.currentId === parentId) {
                    groupsConnection.splice(idx,1);
                }
            })
            while(queue.length > 0) {
                const checkId = queue.shift();
                groupsConnection.forEach( (element,idx) => {
                    if(checkId === element.parentId) {
                        queue.push(element.currentId);
                        element.currentType === "group"? delete groups["groups"][element.currentId]: delete users["users"][element.currentId];
                        groupsConnection.splice(idx,1);
                    }
                })
            }
            associationDb.writeToJson(groupsPathDb, groups);
            associationDb.writeToJson(usersPathDb, users);
            associationDb.writeToJson(gUConnectionsPathDb, groupsConnection);
            resolve(parentId);
        })
    }

    public static deleteUserFromGroup(userId: string, groupId:string) {
        return new Promise( (resolve) => {
            const groupsConnection = associationDb.readFromJson(gUConnectionsPathDb);
            groupsConnection.forEach( (element,idx) => {
                if(userId === element.currentId && groupId === element.parentId) {
                    groupsConnection.splice(idx,1);
                    associationDb.writeToJson(gUConnectionsPathDb, groupsConnection);
                    resolve(1);
                }
            })
            resolve("user/group doe/'snt exist");
        })
    }

    public static buildTree() {
        return new Promise ( async (resolve) => {
            let queue = [], tree = {};
            const groups = associationDb.readFromJson(groupsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            const root = await this.findRoot();
            queue.push(root);
            while(queue.length) {
                const checkingItem = queue.shift();
                //this.findNodeById(tree,checkingItem.parentId);
                if(checkingItem.currentType === "user"){
                    tree[checkingItem.currentId] = ({"currentId":checkingItem.currentId,"parentId":checkingItem.parentId,"name": users["users"][checkingItem.currentId]["UserName"],"type":"user"});
                }else {
                    tree[checkingItem.currentId] = ({"currentId":checkingItem.currentId,"parentId":checkingItem.parentId,"name": groups["groups"][checkingItem.currentId]["groupName"], "type": "group", "items": []});
                }
                for(const item in gUConnections) {
                    if(gUConnections[item].parentId === checkingItem.currentId) {
                        queue.push(gUConnections[item]);
                    }
                }
            }
            resolve(tree);
        })
    }

    public static nextTree(tree) {
        return new Promise( (resolve) => {
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
        })
    }

    public static findNodeById(tree:{},id:string) {
        let queue = [tree[0]];
        while(queue.length) {
            const checkNode = queue.shift();
            if(checkNode.id === id) {
                return checkNode;
            }
            for(var i in checkNode.items) {
                queue.push(checkNode.items[i]);
            }
        }
        return null;
    }

    public static findRoot() {
        return new Promise( (resolve) => {
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            gUConnections.forEach( (element) => {
                if(element.parentId === "null") {
                    resolve (element);
                }
            })
        })
    }

    public static addUserToGroup(userId, groupId) {
        return new Promise( (resolve, reject) => {
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            const groups = associationDb.readFromJson(groupsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            if(User.findUserInUsers(userId,users["users"]) && Group.findGroupInGroups(groupId,groups["groups"])){
                gUConnections.push({"parentId": groupId,
                    "currentId": userId,
                    "currentType": "user"});
                associationDb.writeToJson(gUConnectionsPathDb,gUConnections);
                resolve({"userId":userId,"groupId":groupId});
            }
            reject("userId or groupId not exist");
        })
    }

    public static getUsersInGroup(groupId:string) {
        return new Promise( (resolve, reject) => {
            let usersArray = [];
            const gUConnections = associationDb.readFromJson(gUConnectionsPathDb);
            const users = associationDb.readFromJson(usersPathDb);
            gUConnections.forEach( (element) => {
                if(element.parentId === groupId && element.currentType === "user") {
                    usersArray.push({"id":element.currentId,...users["users"][element.currentId]});
                }
            })
            resolve(usersArray);
        })
    }

}

export default UserGroupAssociation;
