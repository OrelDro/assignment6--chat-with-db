import * as React from 'react';
import IUser from '../interfaces/IUser';
import LoginModal from './LoginModal';
import '../css/loginPanel.css';

export enum ERROR_MSG{
    none,
    allGood,
    credentials,
    locked
}

interface ILoginPanelState {
    loggedInUser: IUser | null,
    errorMsg: ERROR_MSG,
    counter: number
}

interface ILoginPanelProps {
    showLoginPanel: boolean,
    history:any,
    toggleDisplayNavBar: () => void,
    userLogin: (user:IUser) => any,
    setUserLogin: any
}


class LoginPanel extends React.Component<ILoginPanelProps, ILoginPanelState> {
    constructor(props:ILoginPanelProps) {
        super(props);
        this.state = {
            loggedInUser: null,
            errorMsg: ERROR_MSG.none,
            counter: 0
        }
    }

    auth = (user: IUser): any => {
        return new Promise( async (resolve) => {
            const res = await this.props.userLogin(user);
            resolve(res);
        })
    }

     onLoginSubmitHandler = (user:IUser)=>{
        this.auth(user).then( (res: any) => {
            if(res){
                this.props.setUserLogin(res);
                this.props.toggleDisplayNavBar();
                this.setState({
                    loggedInUser: user,
                    errorMsg: ERROR_MSG.allGood
                }, ()=>{
                    this.props.history.push('/chat');
                })
            }
            else{
                if(this.state.counter===2){
                    this.setState({
                        loggedInUser: null,
                        errorMsg: ERROR_MSG.locked
                    });
                }
                else {
                    this.setState((prev) => ({
                        loggedInUser: null,
                        errorMsg: ERROR_MSG.credentials,
                        counter: prev.counter + 1
                    }));
                }
            }
        })
    };

    public render() {
        let showLogin;
        if(this.props.showLoginPanel) {
            showLogin = (
                <section className='loginPanel'>
                    <LoginModal loginStatus={this.state.errorMsg}
                                onSubmit={this.onLoginSubmitHandler}
                                toggleDisplayNavBar={this.props.toggleDisplayNavBar}/>
                </section>
            );
        }
        else showLogin = <></>;
        return (
                <>{showLogin}</>
            );
    }
}

export default LoginPanel;