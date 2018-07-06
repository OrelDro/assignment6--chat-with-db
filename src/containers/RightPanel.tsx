import * as React from 'react';
import InputBlock from '../components/InputBlock';
import MsgPanel from './MsgPanel';
import '../css/rightPanel.css';
import IMessage from "../interfaces/IMessage";

interface IRightPanelProps {
    currentNode: {},
    usernameLogin: {},
    messages: IMessage[],
    setMessage: any
}


class RightPanel extends React.Component<IRightPanelProps,{}> {

    public render() {
        const userLogin = this.props.usernameLogin;
        const currentNode = this.props.currentNode?
            this.props.currentNode["name"]: "Group Name";
        return (
            <div className='rightPanel'>
                <span className="groupUserHeader">{currentNode}</span>
                <MsgPanel currentNode={this.props.currentNode}
                          messages={this.props.messages}
                          usernameLogin={this.props.usernameLogin}/>
                {userLogin && <InputBlock currentNode={this.props.currentNode}
                                          userNameLogin={this.props.usernameLogin}
                                          setMessage={this.props.setMessage}/>}
            </div>
        );
    }
}

export default RightPanel;