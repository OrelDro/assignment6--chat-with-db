import Group from '../models/Group';
import User from '../models/User';

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
        Group.deleteMany({$or:[{_id:id},{parentId:id}]}).then(() => {
            Group.update({items:id},{$pullAll:{items:[id]}}).then( g => {
                resolve(g);
            }).catch((e) => {reject(e);})
        }).catch((e) => {
            reject(e);
        })
    })
}

export function addUserToGroup(userId: string, groupId: string) {
    return new Promise((resolve,reject) => {
        Group.findById({_id:groupId}).then((group) => {
            if(group.itemsType === "User" || group.itemsType === null) {
                group.itemsType = "User";
                group.items.push(userId);
                group.save();
                resolve(group);
            }
        }).catch((e) => {
            reject(e);
        })
    })
}


export function addGroup(parentId: string, newGroupName: string) {
    return new Promise( (resolve, reject) => {
        const group = new Group({name:newGroupName,parentId:parentId,type:"Group"});
        group.save().then((newGroup) => {
            if(parentId) {
                Group.findOne({_id:parentId}).then((parentGroup) => {
                    parentGroup.items.push(newGroup._id.toString());
                    parentGroup.itemsType = "Group";
                    parentGroup.save();
                }).catch((e) => {reject(e);})
            }
            resolve(newGroup);
        }).catch((e) => {
            reject(e);
        })
    })
}

export function deleteUserFromGroup(params) {
    return new Promise( (resolve, reject) => {
        Group.update({items:params.userId,_id:params.groupId},{$pullAll:{items:[params.userId]}})
            .then((group) => {
                resolve(group);
            }).catch((e) => {reject(e)})
    })
}

export function getUsersInGroup(groupId: string) {
    return new Promise( (resolve, reject) => {
        Group.find({_id:groupId}).populate("items")
            .exec((err,returnGroup) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(returnGroup);
                }
            })
    })
}

export function buildTree() {
    return new Promise( async (resolve,reject) => {
        const users = await getUsersInObj();
        const groups = await getGroupsInObj();
        Group.findOne({parentId:null},{__v:0}).lean().then((root) => {
            const tree = build(root,groups,users);
            resolve([tree]);
        }).catch((e) => { reject(e);})
    })
}

function build(treeObj,groups,users){
    let obj = treeObj;
    const children = treeObj.items ;
    if(children.length){
        children.forEach((value,index)=>{
            if(obj.itemsType == "Group"){
                obj.items[index] = build(groups[value],groups,users);
            }
            else{
                obj.items[index] = users[value];
            }
        });
    }
    return obj;
}

function getUsersInObj() {
    return new Promise((resolve, reject) => {
        let usersObj = {};
        User.find({},{password:0,__v:0}).lean().then((users) => {
            users.forEach((user) => {
                usersObj[user._id] = {"name":user.username, ...user};
            })
            resolve(usersObj);
        }).catch((e) => {
            reject(e);
        })
    })
}

function getGroupsInObj() {
    return new Promise((resolve, reject) => {
        let groupsObj = {};
        Group.find({},{__v:0}).lean().then((groupsList) => {
            groupsList.forEach((group) => {
                groupsObj[group._id] = group;
            });
            resolve(groupsObj);
        }).catch((e) => {
            reject(e);
        })
    })
}