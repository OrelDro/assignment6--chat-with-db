import * as React from 'react';
import '../css/msgPanel.css';
import Message from "../components/Message";
import IMessage from "../interfaces/IMessage";

interface IMsgPanelProps {
    currentNode: {},
    usernameLogin: {},
    messages: IMessage[]
}

class MsgPanel extends React.Component<IMsgPanelProps,{}> {
    readonly msgPanelRef: React.RefObject<HTMLDivElement>;
    constructor(props: IMsgPanelProps){
        super(props);
        this.msgPanelRef = React.createRef();
    }

    shouldComponentUpdate(nexProps:IMsgPanelProps, nextState:{}) {
        if(nexProps.messages !== this.props.messages){
            return true
        }
        return false
    }

    componentDidUpdate(){
        this.msgPanelRef.current.scrollTop = 99999999;
    }

    public render() {
        let list;
        const messages = this.props.messages;
        const loginUser = this.props.usernameLogin;
        if(messages && loginUser){
             list = messages.map((message:{content:string,sender:string,time:string}, idx:number)=>{
                return (
                    <Message key={idx} userLogin={this.props.usernameLogin}
                             messageSender={message.sender}
                             messageContent={message.content}
                             messageTime={message.time}/>
                )
            })
        }
        return (
            <div className='msgPanel' ref={this.msgPanelRef}>
                <div>{list}</div>
            </div>
        );
    }
}

export default MsgPanel;