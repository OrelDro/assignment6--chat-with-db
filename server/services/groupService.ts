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
        Group.deleteMany({$or:[{_id:id},{parentId:id}]}).then((deletedGroup) => {
            Group.update( {"childrens.item":id},{$pullAll:{"childrens.item":[id]}});
            resolve(deletedGroup);
        }).catch((e) => {
            reject(e);
        })
    })
}

export function addUserToGroup(userId: string, groupId: string) {
    return new Promise((resolve,reject) => {
        Group.findById({_id:groupId}).then((group) => {
            if(group.childrens.kind === "User" || group.childrens.kind === undefined) {
                group.childrens.kind = "User";
                group.childrens.item.push(userId);
                group.save();
                resolve(group);
            }
        }).catch((e) => {
            reject(e);
        })
    })
}

//groupF.childrens.kind = "Group";
//groupF.childrens.items.push(newGroup._id.toString());

export function addGroup(parentId: string, newGroupName: string) {
    return new Promise( (resolve, reject) => {
        const group = new Group({name:newGroupName,parentId:parentId});
        group.save().then((newGroup) => {
            if(parentId) {
                Group.findOne({_id:parentId}).then( (parentGroup) => {
                    parentGroup.childrens.push({kind:"Group",item:newGroup._id.toString()});
                    parentGroup.save();
                })
            }
            resolve(newGroup);
        }).catch((e) => {
            reject(e);
        })
    })
}

export function deleteUserFromGroup(userId: string, groupId: string) {
    return new Promise( (resolve, reject) => {
        Group.update({"childrens.item":userId,_id:groupId},{$pullAll:{"childrens.item":[userId]}})
            .then((group) => {
                resolve(group);
            }).catch((e) => {reject(e)})
    })
}

export function buildTree() {
    return new Promise( (resolve) => {
        Group.findOne({parentId:null})
            .populate({
                path: 'childrens.item',
                populate: {path: 'childrens.item'}
            }).exec((err,res) => {
            resolve(res);
        })
    })
}
