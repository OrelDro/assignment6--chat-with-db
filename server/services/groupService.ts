//import Group from "../models/Group";
//import { v4 as uuid } from 'uuid';
import Group from '../models/Group';


export function getGroupsList() {
    return new Promise((resolve, reject) => {
         Group.find(null,{__v:0}).then( (groupsList) => {
             resolve(groupsList);
         }).catch((e) => {
             reject(e);
         })
    })
}

export function deleteGroup(id: string) {
    return new Promise( (resolve, reject) => {
        Group.deleteMany({$or:[{_id:id},{parentId:id},{"childrens.items":id}]}).then((deletedGroup) => {
            resolve(deletedGroup);
        }).catch((e) => {
            reject(e);
        })
    })
}

export function addGroup(parentId: string, newGroupName: string) {
    return new Promise( async (resolve, reject) => {
        const group = new Group({name:newGroupName,parentId:parentId});
        group.save().then((newGroup) => {
            if(parentId) {
                Group.findById({_id:parentId}).then( (groupF) => {
                    groupF.childrens.kind = "Group";
                    groupF.childrens.items.push(newGroup._id.toString());
                    groupF.save();
                });
            }
            resolve(newGroup);
        }).catch((e) => {
            reject(e);
        })
    })
}