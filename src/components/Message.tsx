import * as React from 'react';
import '../css/message.css';

interface IMessageProps {
    userLogin: {}
    messageContent: string,
    messageSender: string,
    messageTime: string
}

class Message extends React.Component<IMessageProps,{}> {
    constructor(props: IMessageProps) {
        super(props)
    }
    public render() {
        return (
            <div className={this.props.messageSender === this.props.userLogin["username"]?'bubble':'bubble bubble--alt'}>
                <span className='messageSender'>{this.props.messageSender}</span>
                <span>{this.props.messageContent}</span>
                <span><time>{this.props.messageTime}</time></span>
            </div>
        );
    }
}

export default Message;