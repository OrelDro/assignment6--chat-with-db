import IUser from "../interfaces/IUser";
import {apiCalls} from '../ApiCalls';

export interface IStateStore {
    state: {};
    currentNode: object | null;
    items: object[];
    userNameLogin: string | null;
    showLoginPanel: boolean;
    users: IUser[];
    leftPanelTree: object[];
    groups: object[];
}

class StateStoreService {
    public listeners :Function[];

    constructor(){
        this.init()
        this.listeners = []
    }

    public set(key: string, val: any) {
        StateStore.getInstance()[key] = val;
    }

    public get(key: string) {
        return StateStore.getInstance()[key] || [];
    }

    public subscribe(listener: any) {
        this.listeners.push(listener);
    }

    private onStoreChanged(whatChanged : string[]) {
        const event = {changed : whatChanged}
        for (const listener of this.listeners) {
            listener(event);
        }
    }

    async init(){
        return Promise.all([this.getUsersList(),this.getTree(),this.getGroupsList()]).then((results)=>{
            this.set('users', results[0]);
            this.set('leftPanelTree', results[1]);
            this.set('groups', results[2]);
            this.onStoreChanged(['users','leftPanelTree','groups']);
        })

    }

    public getUsers(){
        return StateStore.getInstance()['users'];
    }

    public getLeftPanelTree() {
        return StateStore.getInstance()['leftPanelTree'];
    }

    public getGroups(){
        return StateStore.getInstance()['groups'];
    }

    public unsubscribe(listener:any){
        const index = this.listeners.findIndex(listener);
        if(index !== -1){
            this.listeners.splice(index, 1);
        }
    }

    private getUsersList() {
        return new Promise( (resolve) => {
            apiCalls.get('users').then((userList: IUser[]) => {
                resolve(userList);
            })
        })
    }

    public getGroupsList() {
        return new Promise( (resolve) => {
            apiCalls.get('groups').then((groupsList: Object[]) => {
                resolve(groupsList);
            })
        })
    }

    public addGroup(group: object) {
        return new Promise( (resolve) => {
            apiCalls.post('groups/addGroup', group).then( (res) => {
                resolve(res);
            })
        })
    }

    public deleteUser(id: string) {
        return new Promise( (resolve) => {
            apiCalls.delete('users/deleteUser',id).then( (user: IUser) => {
                resolve(user);
            })
        })
    }

    public updateUser(user: IUser) {
        return new Promise( (resolve) => {
            apiCalls.put('users/updateUser',user).then( (user: IUser) => {
                resolve(user);
            })
        })
    }

    public loginUser(user:IUser) {
        return new Promise( (resolve) => {
            apiCalls.post('users/login', user).then((res) => {
                resolve(res);
            })
        })
    }

    public addNewUser(user:IUser) {
        return new Promise( (resolve) => {
            apiCalls.post('users/addUser', user).then((res) => {
                resolve(res);
            })
        })
    }

    public getTree() {
        return new Promise( (resolve) => {
            apiCalls.get('groups/getTree').then((tree: any) => {
                resolve(tree);
            })
        })
    }

    public deleteGroupsWithChildrens(id: string) {
        return new Promise( (resolve) => {
            apiCalls.delete('groups/deleteGroup',id).then( (res) => {
                resolve(res);
            })
        })

    }

    public deleteUserFromGroup(userId: string, groupId:string) {
        return new Promise( (resolve) => {
            apiCalls.delete('groups/deleteUserFromGroup',{userId,groupId}).then( (res) => {
                resolve(res);
            })
        })
    }

    public getUsersFromGroup(groupId: string) {
        return new Promise( (resolve) => {
            apiCalls.get(`groups/getUsersInGroup/${groupId}`).then( (res) => {
                resolve(res);
            })
        })
    }

    public addUserToGroup(userId:string,groupId:string) {
        return new Promise( (resolve) => {
            apiCalls.put('groups/addUserToGroup',{userId,groupId}).then( (res) => {
                resolve(res);
            })
        })
    }

    public getConversation(type:string, id: string, sender: string, receiver: string) {
        return new Promise( (resolve) => {
            apiCalls.post('conversation',{type,id,sender,receiver}).then( (res) => {
                resolve(res);
            })
        })
    }

    public saveMessage(msg:{}) {
        return new Promise( (resolve) => {
            apiCalls.put('conversation/saveMsg',msg).then( (res) => {
                resolve(res);
            })
        })
    }

}

class StateStore implements IStateStore {

    items: object[] = [
        {
            "type": "group",
            "name": "Friends",
            "messages": [
                {
                    "time": "22:00",
                    "content": "hey!!! how are you?",
                    "sender": "orel"
                },
                {
                    "time": "22:02",
                    "content": "hey!!! how are you?",
                    "sender": "ravid"
                }
            ],
            "items": [
                {
                    "type": "group",
                    "name": "Best Friends",
                    "messages": [
                        {
                            "time": "22:00",
                            "content": "hey!!! how are you?",
                            "sender": "orel"
                        },
                        {
                            "time": "22:02",
                            "content": "fine ty",
                            "sender": "ravid"
                        },
                        {
                            "time": "22:03",
                            "content": "!!!!!!!!!!!!!!!!!",
                            "sender": "orel"
                        },
                        {
                            "time": "22:05",
                            "content": "ty!!!!!!!",
                            "sender": "ravid"
                        }
                    ],
                    "items": [
                        {
                            "type": "user",
                            "name": "Tommy",
                            "messages": []
                        }
                    ]
                },
                {
                    "type": "user",
                    "name": "Udi",
                    "messages": []
                }
            ]
        },
{
    "type": "user",
    "name": "Ori",
    "messages": []
},
{
    "type": "user",
    "name": "Roni",
    "messages": []
}];
    state: {} = {};
    users: IUser[];
    currentNode: null;
    userNameLogin: null;
    showLoginPanel: false;
    leftPanelTree: object[];
    groups: object[];

    static instance: IStateStore;
    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }
        return StateStore.instance;
    }
}

export const stateStoreService = new StateStoreService();