import * as React from 'react';
import Field from "../components/Field";
import '../css/userEdit.css';
import IUser from "../interfaces/IUser";
import {Link} from 'react-router-dom';

interface IUserEditProps {
    location: any,
    updateUser: any
}

interface IUserEditState {
    userUpdate: IUser
}

class UserEdit extends React.Component<IUserEditProps,IUserEditState> {
    constructor(props: IUserEditProps) {
        super(props)
        this.state = {
            userUpdate: {UserName:"",Password:"",age:-1}
        }
    }

    private saveChanged = () => {
        const user = {
            ...this.props.location.state.user,
            "username": this.state.userUpdate.UserName,
            "password": this.state.userUpdate.Password,
            "age": this.state.userUpdate.age,
            "type": "User"
        }
        this.props.updateUser(user);
    }
    private updateField = (fieldName: string, value: string) => {
        this.setState(() => {
            return {
                userUpdate: {
                    ...this.state.userUpdate,
                    [fieldName]: value
                }
            }
        })
    };

    public render() {
        //const userDetail = this.props.location.state.user;
        return (
            <div className='userEditMainDiv'>
                <button><Link to='/users'>Back</Link></button>
                <div className='userEditInputs'>
                    <Field name={'UserName'} onChange={this.updateField} type={'text'}/>
                    <Field name={'Password'} onChange={this.updateField} type={'password'} />
                    <Field name={'age'} onChange={this.updateField} type={'number'} />
                    <button onClick={this.saveChanged}>Save Changes</button>
                </div>
            </div>
        );
    }
}

export default UserEdit;