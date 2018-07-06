import * as mongoose from 'mongoose';
import * as Db from '../db';

const groupDb = new Db.Db();
const groupPathDb = '/groups.json';
const gUConnectionsPathDb = '/groupsUsersConnections.json';

class Group {
    private id: string;
    private groupName: string;
    constructor(id: string, groupName: string){
        this.id = id;
        this.groupName = groupName;
    }

    public static addGroup(newGroup: Group,parentId: string) {
        return new Promise((resolve, reject) => {
            const groups = groupDb.readFromJson(groupPathDb);
            const groupsConnection = groupDb.readFromJson(gUConnectionsPathDb);
            groups["groups"][newGroup.id] = {
                "groupName": newGroup.groupName
            };
            groupsConnection.push({ "parentId":parentId,
                                    "currentId":newGroup.id,
                                    "currentType":"group"});
            if(!groups) {
                reject("error Get Groups");
            }
            groupDb.writeToJson(groupPathDb,groups);
            groupDb.writeToJson(gUConnectionsPathDb,groupsConnection);
            resolve(newGroup);
        })
    }

    public static getGroups() {
        return new Promise((resolve, reject) => {
            const groups = groupDb.readFromJson(groupPathDb);
            if(!groups) {
                reject("error Get Groups");
            }
            resolve(groups);
        })
    }

    public static deleteGroup(groupId: string) {
        return new Promise( (resolve, reject) => {
            const groups = groupDb.readFromJson(groupPathDb);
            const groupToDelete = this.findGroupInGroups(groupId,groups["groups"]);
            if(groupToDelete) {
                delete groups["groups"][groupId];
                groupDb.writeToJson(groupPathDb,groups);
                resolve(new Group(groupId,groupToDelete.groupName));
            }
            else {
                reject (`groupId ${groupId} not exist`);
            }
        })
    }

    public static deleteGroupInConnectionT(id: string) {
        const groupsConnection = groupDb.readFromJson(gUConnectionsPathDb);
        groupsConnection.forEach( (element,idx) => {
            if(element.currentId === id) {
                groupsConnection.splice(idx,1);
            }
        })
        groupDb.writeToJson(gUConnectionsPathDb,groupsConnection);
    }

    public static findGroupInGroups(id: string, groups:{}) {
        return groups[id];
    }
}

const groupSchema = mongoose.Schema({
    name: String,
    parentId: {type:mongoose.Schema.Types.ObjectId, default: null},
    childrens: {
        kind: String,
        items: [{type:mongoose.Schema.Types.ObjectId, refPath:'childrens.kind'}]
    }
})


export default mongoose.model('Group', groupSchema);

//export default Group;