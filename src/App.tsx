import * as React from 'react';
import './css/App.css';
import LeftPanel from './containers/LeftPanel';
import RightPanel from './containers/RightPanel';
import {stateStoreService} from './StateStore/StateStore'
import NavBar from './components/NavBar';
import LoginPanel from './containers/LoginPanel';
import UsersPanel from './components/UsersPanel';
import {Route, Switch} from 'react-router-dom';
import IUser from "./interfaces/IUser";
import UserEdit from "./components/UserEdit";
import { withRouter, RouteComponentProps } from 'react-router'
import GroupsPanel from "./components/GroupsPanel";
import IMessage from "./interfaces/IMessage";
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
            debugger;
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
        socket.emit('leaveFromGroup',this.state.usernameLogin["UserName"],this.state.currentNode["name"]);
        this.setState({currentNode: cNode});
        if(cNode["type"] && cNode["currentId"] && this.state.usernameLogin["UserName"] && cNode["name"]) {
            socket.emit('joinToGroup', this.state.usernameLogin["UserName"],cNode["name"]);
            this.buildConversation(cNode["type"],cNode["currentId"],this.state.usernameLogin["UserName"],cNode["name"]).
            then( (res:any) => {
                if(res != "no messages") {
                    this.setState({messages:res});
                }
                else {
                    this.setState({messages:[]});
                }
            })
        }
    }

    public LogOut = () => {
        socket.emit('logout',this.state.usernameLogin["UserName"]);
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
                return element.id === userDeleted.id;
            });
            newUsersArr.splice(index, 1);
            this.setState({users: newUsersArr});
        })
    }

    public updateUser = (user: IUser) => {
        stateStoreService.updateUser(user).then((userUpdated: IUser) => {
            const newUsersArr = [...this.state.users];
            const index = this.state.users.findIndex((element) => {
                return element.id === userUpdated.id;
            });
            newUsersArr[index] = userUpdated;
            this.setState({users: newUsersArr});
            stateStoreService.getTree().then( (tree: Object[]) => {
                this.setState({leftPanelTree:tree});
            });
            this.props.history.push('/users');
        })
    }

    public Login = (user: IUser) => {
        return new Promise( (resolve) => {
            stateStoreService.loginUser(user).then( (userLogin: IUser | Boolean) => {
                resolve(userLogin);
            })
        })
    }

    public setUserLogin = (userLogin:{}) => {
        this.setState({usernameLogin:userLogin});
        socket.emit('login', this.state.usernameLogin["UserName"]);
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
            if(res == id) {
                stateStoreService.init();
            }
        })
    }

    public deleteUserFromGroup = (userId:string, groupId:string) => {
        stateStoreService.deleteUserFromGroup(userId, groupId).then( (res) => {
            if(res == 1) {
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
            const messageCon = this.state.messages.concat([res]);
            this.setState({messages:messageCon});
            socket.emit('sendMessage',this.state.currentNode["name"], res);
        })
    }

    public render() {
        return (
            <>
                <NavBar userNameLogin={this.state.usernameLogin["UserName"]}
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