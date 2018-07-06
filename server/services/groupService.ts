import Group from "../models/Group";
import { v4 as uuid } from 'uuid';

export function getGroupsList() {
    return new Promise((resolve, reject) => {
         Group.getGroups().then( (groupsList) => {
             const groupsArray = [];
             for(const group in groupsList["groups"]) {
                 groupsArray.push({"id":group,...groupsList["groups"][group]})
             }
             resolve(groupsArray);
         })
    })
}

export function deleteGroup(id: string) {
    return new Promise( async (resolve, reject) => {
        const groupDelete = await Group.deleteGroup(id);
        Group.deleteGroupInConnectionT(id);
        if(groupDelete) {
            resolve(groupDelete);
        }
        else {
            reject (`groupId ${id} not exist`);
        }
    })
}

export function addGroup(parentId: string, newGroupName: string) {
    return new Promise( async (resolve, reject) => {
        const id = uuid();
        const newGroup = new Group(id,newGroupName);
        const groupReturned = await Group.addGroup(newGroup,parentId);
        if(groupReturned) {
            resolve(groupReturned);
        }
        else {
            reject (`groupId ${parentId} not exist`);
        }
    })
}