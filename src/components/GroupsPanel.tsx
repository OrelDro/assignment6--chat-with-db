import * as React from 'react';
import GroupsTable from './GroupsTable';
import Field from "./Field";
import "../css/groupsPanel.css";

interface IGroupsPanelProps {
    groups: any,
    addGroupToGroup: any,
    deleteGroupWithChildrens: any,
    deleteUserFromGroup: any,
    getUsersFromGroup: any,
    usersList: any,
    addUserToGroup:any
}

interface IGroupsPanelState {
    newGroup: any,
    showAddGroupInputs: boolean,
    showDeleteUserFromGroupInputs:boolean,
    usersListFgroup: object[],
    groupId: string,
    userId: string,
    showAddUserToGroup: boolean
}

class GroupsPanel extends React.Component<IGroupsPanelProps,IGroupsPanelState> {
    constructor(props: IGroupsPanelProps) {
        super(props);
        this.state = {
            newGroup: {},
            showAddGroupInputs: false,
            showDeleteUserFromGroupInputs: false,
            usersListFgroup: [],
            groupId: "",
            userId: "",
            showAddUserToGroup: false
        }
    }

    public updateField = (fieldName: string, value: string) => {
        this.setState(() => {
            return {
                newGroup: {
                    ...this.state.newGroup,
                    [fieldName]: value
                }
            }
        })
    };

    private createNewGroupInGroup = () => {
        const newGroup = {
            "newGroupName": this.state.newGroup.GroupName,
            "parentGroupId": this.state.newGroup.parentGroupId
        }
        this.props.addGroupToGroup(newGroup);
        this.setState({showAddGroupInputs: false,newGroup: {}});
    }

    private setIdGroupParent = (parentGroupId: string) => {
        this.setState( () => {
            return {
                newGroup: {
                    ...this.state.newGroup,
                    "parentGroupId": parentGroupId
                },
                showAddGroupInputs: true,
                showAddUserToGroup:false,
                showDeleteUserFromGroupInputs:false
            }
        })
    }

    public setGroupIdToGetUsers = (parentGroupId: string) => {
        this.props.getUsersFromGroup(parentGroupId).then( (usersList:any) => {
            this.setState({showDeleteUserFromGroupInputs: true,
                usersListFgroup:usersList,
                showAddGroupInputs: false,
                showAddUserToGroup:false,
            });
            if(usersList.length > 0) {
                this.setState({userId:usersList[0].id,
                    "groupId": parentGroupId});
            }
        });
    }

    public setUserCurrentValue = (e:any) => {
        this.setState({userId: e.target.value});
    }

    public deleteUserFromGroupClickHandler = () => {
        this.props.deleteUserFromGroup(this.state.userId, this.state.groupId);
        this.setState({showDeleteUserFromGroupInputs: false,userId: "", groupId:""});
    }

    public deleteUserFromGroupRender = () => {
        let usersList;
        usersList = this.state.usersListFgroup.map( (element) => {
                return (<option key={element["id"]} value={element["id"]}>{element["UserName"]}</option>)
            }
        )
        if(usersList.length > 0) {
            return (
                <div className="deleteUserFromGroup">
                    <h2>Delete User From Group</h2>
                    <select onChange={this.setUserCurrentValue}>{usersList}</select>
                    <br/>
                    <button onClick={this.deleteUserFromGroupClickHandler}>Submit</button>
                </div>
            )
        }
        else {
            return <span>this group has no users</span>
        }
    }

    public setGroupIdToAddUser = (groupId: string) => {
        this.setState({showAddUserToGroup:true,
            showAddGroupInputs: false,
            showDeleteUserFromGroupInputs:false
        });
        if(this.props.usersList.length > 0) {
            this.setState({groupId:groupId,userId:this.props.usersList[0].id});
        }
    }

    public addUserToGroupHandler = () => {
        this.props.addUserToGroup(this.state.userId,this.state.groupId).then( (res:any) => {
            console.log(res);
            this.setState({showAddUserToGroup:false})
        })
    }

    public addGroupToGroupRender = () => {
        return (<div className="addGroupToGroup">
            <h2>Create Group</h2>
            <Field name={"GroupName"} onChange={this.updateField} type={"text"}/>
            <button onClick={this.createNewGroupInGroup}>Submit</button>
        </div>);
    }

    public addUserToGroupRender = () => {
        let usersListValues;
        const users = this.props.usersList;
        usersListValues = users.map( (element:any,idx:number) => {
            return <option key={idx} value={element.id}>{element.UserName}</option>
        })
        return (
            <div className="addUserToGroup">
                <h2>Add User To Group</h2>
                <select onChange={this.setUserCurrentValue}>{usersListValues}</select>
                <button onClick={this.addUserToGroupHandler}>submit</button>
            </div>)

    }

    public render() {
        return (
            <>
                <GroupsTable groups={this.props.groups}
                             setIdGroupParent={this.setIdGroupParent}
                             deleteGroupWithChildrens={this.props.deleteGroupWithChildrens}
                             setGroupIdToGetUsers={this.setGroupIdToGetUsers}
                             setGroupIdToAddUser={this.setGroupIdToAddUser}
                />
                {this.state.showAddGroupInputs && this.addGroupToGroupRender()}
                {this.state.showDeleteUserFromGroupInputs && this.deleteUserFromGroupRender()}
                {this.state.showAddUserToGroup && this.addUserToGroupRender()}
            </>
        )
    }
}

export default GroupsPanel;
