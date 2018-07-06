import UserGroupAssociation from '../models/UserGroupAssociation';

export function buildTree() {
    return new Promise( (resolve) => {
        UserGroupAssociation.buildTree().then(  (result) => {
            UserGroupAssociation.nextTree(result).then( (root) => {
                const rootArray = [root];
                resolve(rootArray);
            });
    })})
}

export function addUserToGroup(userId: string, groupId: string) {
    return new Promise( (resolve) => {
        UserGroupAssociation.addUserToGroup(userId,groupId).then( (res) => {
            resolve (res);
        }).catch( (e) => {throw new Error(e);})
    })
}

export function deleteUserFromGroup(userId: string, groupId: string) {
    return new Promise( (resolve) => {
        UserGroupAssociation.deleteUserFromGroup(userId,groupId).then( (res) => {
            resolve (res);
        }).catch( (e) => {throw new Error(e);})
    })
}


export function getUsersInGroup(groupId: string) {
    return new Promise( (resolve) => {
        UserGroupAssociation.getUsersInGroup(groupId).then( (res) => {
            resolve (res);
        }).catch( (e) => {throw new Error(e);})
    })
}


export function deleteGroupChildrens(parentId: string) {
    return new Promise( (resolve) => {
        UserGroupAssociation.deleteGroupAndChildrens(parentId).then( (res) => {
            resolve(res);
        }).catch( (e) => {throw new Error(e);})
    })
}