import * as React from 'react';
import UsersTable from '../components/UsersTable';
import Field from "../components/Field";
import IUser from "../interfaces/IUser";
import '../css/usersPanel.css';

interface IUsersPanelProps {
    users: any,
    deleteUser: any,
    addNewUser: any
}

interface IUsersPanelState {
    newUser: IUser,
    toggleAddUserInputs: boolean
}

class UsersPanel extends React.Component<IUsersPanelProps,IUsersPanelState> {
    constructor(props: IUsersPanelProps) {
        super(props);
        this.state = {
            newUser: {UserName:"",Password:"",age:-1},
            toggleAddUserInputs: false
        }
    }

    public updateField = (fieldName: string, value: string) => {
        this.setState((prevState) => {
            return {
                newUser: {
                    ...this.state.newUser,
                    [fieldName]: value
                }
            }
        })
    };

    public showAddUserInputs = () => {
        this.setState((prevState) => {
            return {
                toggleAddUserInputs:!(prevState.toggleAddUserInputs)
            }
        });
    }
    private addUserClickSubmit = () => {
        const newUser = {
            ...this.state.newUser,
            "username": this.state.newUser.UserName,
            "password": this.state.newUser.Password,
            "age": this.state.newUser.age,
            "type": "User"
        }
        this.props.addNewUser(newUser);
        this.setState({toggleAddUserInputs: false});
    }

    public render() {
        return (
            <>
                <UsersTable users={this.props.users} deleteUser={this.props.deleteUser} />
                <button onClick={this.showAddUserInputs} className='toggleInputsButton'>Create New User</button>
                {this.state.toggleAddUserInputs && <div className='createNewUserInputs'>
                    <Field name={"UserName"} onChange={this.updateField} type={"text"}/>
                    <Field name={"Password"} onChange={this.updateField} type={"password"}/>
                    <Field name={"age"} onChange={this.updateField} type={"number"}/>
                    <button onClick={this.addUserClickSubmit}>Submit</button>
                </div>}
            </>
        )
    }
}

export default UsersPanel;
