import * as React from 'react';
import '../css/navBar.css';
import {Link} from "react-router-dom";

interface INavBarProps {
    userNameLogin: string,
    toggleDisplayNavBar: () => void,
    LogOut: any
}

class NavBar extends React.Component<INavBarProps,{}> {
    constructor(props:INavBarProps) {
        super(props);
    }
    public onclickLoginHandler = () => {
        this.props.toggleDisplayNavBar();
    }

    public onclickLogoutHandler = () => {
        this.props.LogOut();
    }

    public Login =() => {
        const userNameLogin = this.props.userNameLogin;
        if(userNameLogin) {
            return (
                <>
                    <li><Link to='/chat'><span>Home</span></Link></li>
                    <li><span style={{cursor: 'context-menu'}}>hello {userNameLogin}</span></li>
                    <li><Link to='/chat'><span onClick={this.onclickLogoutHandler}>Logout</span></Link></li>
                    <li className='dropdown' style={{float:'right'}}>
                        <span className='dropbtn'>Admin</span>
                        <div className='dropdown-content'>
                            <Link to='/users'><span>Users</span></Link>
                            <Link to='/groups'><span>Groups</span></Link>
                        </div>
                    </li>
                </>
            );
        }
        else {
             return (<Link to='/login'><li><span onClick={this.onclickLoginHandler}>Login</span></li></Link>);
        }
    }

    public render() {
        return (
            <ul className="topnav">
                {this.Login()}
            </ul>);
    }
}

export default NavBar;