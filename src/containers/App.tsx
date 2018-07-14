import * as React from 'react';
import '../css/App.css';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';
import {stateStoreService} from '../StateStore/StateStore'
import NavBar from '../components/NavBar';
import LoginPanel from '../containers/LoginPanel';
import UsersPanel from './UsersPanel';
import {Route, Switch} from 'react-router-dom';
import IUser from "../interfaces/IUser";
import UserEdit from "./UserEdit";
import { withRouter, RouteComponentProps } from 'react-router'
import GroupsPanel from "./GroupsPanel";
import IMessage from "../interfaces/IMessage";
import * as io from 'socket.io-client';

export const socket =io('http://localhost:4000');

interface IAppState {
    items: object[],
    users: IUser[],
    groups: object[],
    [key:string] : any,
    showLoginPanel: boolean,
    leftPanelTree: object[],
    currentNode: {},
    usernameLogin: {},
    messages: IMessage[]
}

const changeOptions = {
    'users' : stateStoreService.getUsers.bind(stateStoreService),
    'leftPanelTree': stateStoreService.getLeftPanelTree.bind(stateStoreService),
    'groups': stateStoreService.getGroups.bind(stateStoreService)
}

type AppProps = RouteComponentProps<{}> & {};

class App extends React.Component<AppProps,IAppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            items: stateStoreService.get("items"),
            users: [],
            groups: [],
            showLoginPanel: false,
            leftPanelTree: [],
            currentNode: {},
            usernameLogin: "",
            messages: []
        }
    }

    componentWillMount() {
        stateStoreService.subscribe(this.onSubscribe);
    }

    componentWillUnmount() {
        stateStoreService.unsubscribe(this.onSubscribe);
    }

    componentDidMount() {
        socket.on('msg', (msg: IMessage) => {
            this.setState( (prevState) => {
                return {
                    messages: prevState.messages.concat([msg])
                }
            })
        })
    }

    onSubscribe = (event: { changed: string[] }) => {
        if (event.changed) {
            event.changed.forEach((change) => {
                const result = changeOptions[change]();
                this.setState({[change]: result});
            })
        }
    }

    public setCurrentNode = (cNode: {}) => {
        socket.emit('leaveFromGroup',this.state.usernameLogin["username"],this.state.currentNode["name"]);
        this.setState({currentNode: cNode});
        if(cNode["type"] && cNode["_id"] && this.state.usernameLogin["username"] && cNode["name"]) {
            socket.emit('joinToGroup', this.state.usernameLogin["username"],cNode["name"]);
            this.buildConversation(cNode["type"],cNode["_id"],this.state.usernameLogin["username"],cNode["name"]).
            then( (messages:{}) => {
                if(messages != null) {
                    this.setState({messages:messages["messages"]});
                }
                else {
                    this.setState({messages:[]});
                }
            })
        }
    }

    public LogOut = () => {
        socket.emit('logout',this.state.usernameLogin["username"]);
        this.setState({usernameLogin:""});
    }

    public userEditRender = (props: any) => {
        return <UserEdit {...props} updateUser={this.updateUser}/>
    }

    public chatRender = () => {
        return(
        <div className='rightLeftPanels'>
            <LeftPanel name="leftPanel" items={this.state.leftPanelTree} setCurrentNode={this.setCurrentNode}/>
            <RightPanel usernameLogin={this.state.usernameLogin} messages={this.state.messages}
                        currentNode={this.state.currentNode}
                        setMessage={this.setMessage}/>
        </div>)
    }

    public UsersPanelRender = () => (
        <UsersPanel users={this.state.users} deleteUser={this.deleteUser} addNewUser={this.addNewUser}/>
    )

    public GroupsPanelRender = () => (
        <GroupsPanel groups={this.state.groups}
                     addGroupToGroup={this.addGroupToGroup}
                     deleteGroupWithChildrens={this.deleteGroupsWithChildrens}
                     deleteUserFromGroup={this.deleteUserFromGroup}
                     getUsersFromGroup={this.getUsersFromGroup}
                     usersList={this.state.users}
                     addUserToGroup={this.addUserToGroup}
        />
    )

    public loginRender = (props: any) => (
        <LoginPanel {...props} showLoginPanel={this.state.showLoginPanel}
                    toggleDisplayNavBar={this.toggleDisplayNavBar}
                    userLogin={this.Login}
                    setUserLogin={this.setUserLogin}
        />);

    public deleteUser = (id: string) => {
        stateStoreService.deleteUser(id).then((userDeleted: IUser) => {
            const newUsersArr = [...this.state.users];
            const index = this.state.users.findIndex((element) => {
                return element._id === userDeleted._id;
            });
            newUsersArr.splice(index, 1);
            this.setState({users: newUsersArr});
            stateStoreService.getTree().then( (tree: Object[]) => {
                this.setState({leftPanelTree:tree});
            });
        })
    }

    public updateUser = (user: IUser) => {
        stateStoreService.updateUser(user).then((userUpdated: IUser) => {
            const newUsersArr = [...this.state.users];
            const index = this.state.users.findIndex((element) => {
                return element._id === userUpdated._id;
            });
            newUsersArr[index] = userUpdated;
            this.setState({users: newUsersArr});
            stateStoreService.getTree().then( (tree: Object[]) => {
                this.setState({leftPanelTree:tree});
            });
            this.props.history.push('/users');
        })
    }

    public Login = (user: IUser):Promise<object> => {
        return new Promise( (resolve) => {
            stateStoreService.loginUser(user).then( (userLogin: IUser | Boolean) => {
                resolve(userLogin);
            })
        })
    }

    public setUserLogin = (userLogin:{}) => {
        this.setState({usernameLogin:userLogin});
        socket.emit('login', this.state.usernameLogin["username"]);
    }

    public toggleDisplayNavBar = () => {
        const showLoginPanel = !this.state.showLoginPanel;
        this.setState({showLoginPanel: showLoginPanel});
    }

    public addNewUser = (user: IUser) => {
        stateStoreService.addNewUser(user).then( (newUser: IUser) => {
            const newUsersArr = [...this.state.users];
            newUsersArr.push(newUser);
            this.setState({users: newUsersArr});
        })
    }

    public addGroupToGroup = (group: object[]) => {
        stateStoreService.addGroup(group).then( (newGroup: object) => {
            const newGroupsArr = [...this.state.groups];
            newGroupsArr.push(newGroup);
            this.setState({groups: newGroupsArr});
            stateStoreService.getTree().then( (res: object[]) => {
                this.setState({leftPanelTree: res});
            })
        })
    }

    public deleteGroupsWithChildrens = (id: string) => {
        stateStoreService.deleteGroupsWithChildrens(id).then( (res) => {
            if(res["n"] > 0) {
                stateStoreService.init();
            }
        })
    }

    public deleteUserFromGroup = (userId:string, groupId:string) => {
        stateStoreService.deleteUserFromGroup(userId, groupId).then( (res) => {
            if(res["n"] > 0) {
                stateStoreService.init();
            }
        })
    }

    public getUsersFromGroup = (groupId: string) => {
        return new Promise( (resolve) => {
            stateStoreService.getUsersFromGroup(groupId).then( (res) => {
                resolve(res);
            })
        })
    }

    public addUserToGroup = (userId:string, groupId:string) => {
        return new Promise( (resolve) => {
            stateStoreService.addUserToGroup(userId, groupId).then( (res) => {
                if(res) {
                    stateStoreService.init();
                    resolve(res);
                }
            })
        })
    }

    public buildConversation = (type:string, typeId: string, sender: string, receiver: string) => {
        return new Promise( (resolve) => {
            stateStoreService.getConversation(type,typeId,sender,receiver).then( (res) => {
                resolve(res);
            })
        })
    }

    public setMessage = (message:{}) => {
        stateStoreService.saveMessage(message).then( (res:IMessage) => {
            let newMsgArr = this.state.messages;
            this.setState({messages:newMsgArr.concat([res])});
            socket.emit('sendMessage',this.state.currentNode["name"], res);
        })
    }

    public render() {
        return (
            <>
                <NavBar userNameLogin={this.state.usernameLogin["username"]}
                        toggleDisplayNavBar={this.toggleDisplayNavBar} LogOut={this.LogOut}/>
                <Route path='/login' render={this.loginRender}/>
                <Switch>
                    <Route exact={true} path='/chat' render={this.chatRender}/>
                    <Route exact={true} path='/users' render={this.UsersPanelRender}/>
                    <Route exact={true} path='/groups' render={this.GroupsPanelRender}/>
                    <Route exact={true} path='/users/:id/edit' render={this.userEditRender}/>
                    <Route path='/' render={this.chatRender}/>
                </Switch>
            </>
        )
    }
}

export default withRouter(App);