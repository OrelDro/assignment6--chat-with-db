import * as React from 'react';
import IUser from '../interfaces/IUser';
import Field from '../components/Field';
import '../css/loginModal.css';
import {ERROR_MSG} from "./LoginPanel";
import userLogo from '../images/user.svg';
import {Link} from "react-router-dom";
import {stateStoreService} from "../StateStore/StateStore";

interface ILoginModalProps {
    onSubmit: (u: IUser) => void,
    loginStatus: ERROR_MSG,
    toggleDisplayNavBar: () => void
}

interface ILoginModalState {
    user: IUser
}

class LoginModal extends React.Component<ILoginModalProps, ILoginModalState> {
    private messages = {
        [ERROR_MSG.allGood]: 'you\'re logged in!!!',
        [ERROR_MSG.credentials]: 'username or password are wrong!',
        [ERROR_MSG.locked]: 'you\'re locked!!'
    };
    private colors = {
        [ERROR_MSG.allGood]: 'green',
        [ERROR_MSG.credentials]: 'red',
        [ERROR_MSG.locked]: 'red'
    }
    constructor(props:ILoginModalProps) {
        super(props);
        this.state = {
            user: {UserName:'', Password: ''}
        }
    }

    updateField = (fieldName: string, value: string) => {
        this.setState((prevState) => {
            return {
                user: {
                    ...this.state.user,
                    [fieldName]: value
                }
            }
        })
    };

    submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onSubmit(this.state.user);
    };

    closeHandler = () => {
        stateStoreService.set("showLoginPanel", false);
        this.props.toggleDisplayNavBar();
    }

    render() {
        return (
            <form className='formInLogin'>
                <Link to={'/chat'}><span onClick={this.closeHandler} className="close">&times;</span></Link>
                <img src={userLogo} alt="Avatar"/>
                <Field name={'UserName'} type={'text'} onChange={this.updateField}/>
                <Field name={'Password'} type={'password'} onChange={this.updateField}/>
                <button type="button" onClick={this.submitHandler}>Login</button>
                <p style={{color:this.colors[this.props.loginStatus]}}>{this.messages[this.props.loginStatus]}</p>
            </form>
        );
    }
}

export default LoginModal;