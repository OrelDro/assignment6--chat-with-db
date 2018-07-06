import * as React from 'react';
import '../css/inputBlock.css';
//import IMessage from '../interfaces/IMessage';

interface IInputBlockProps {
    userNameLogin: {},
    currentNode:{},
    setMessage:any
}
interface IInputBlockState {
    MessageOnChange: string,
    newMessage: string
}


class InputBlock extends React.Component<IInputBlockProps, IInputBlockState> {
    constructor(props: IInputBlockProps) {
        super(props);
        this.state = {
            MessageOnChange: "",
            newMessage: ""
        }
    }

    public onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({MessageOnChange : event.target.value});
    }

    public saveMessage = () => {
        let promise = new Promise((resolve) => {
            this.setState({ newMessage: this.state.MessageOnChange, MessageOnChange: ""} );

            resolve(true);
        })
        promise.then( () => {
            if(this.state.newMessage.trim() !== "") {
                let sender = this.props.userNameLogin["UserName"];
                let currentNode = this.props.currentNode;
                if(currentNode !== null) {
                    let currentTime = this.getTime();
                    let message = {
                        "time": currentTime,
                        "content": this.state.newMessage,
                        "sender": sender,
                        "receiverName": currentNode["name"],
                        "receiverId": currentNode["currentId"],
                        "type":currentNode["type"]
                    }
                    this.props.setMessage(message);
                }
            }
        })
    }

    public addZero =(i: string | number) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    public getTime = () => {
        const d = new Date();
        let h = this.addZero(d.getHours());
        let m = this.addZero(d.getMinutes());
        return h + ":" + m;
    }

    enterPressHandle = (e: React.FocusEvent<any>) => {
        onkeypress = (e: any)=>{
           if(e.target.type === "textarea" && e.key === "Enter") {
               this.saveMessage();
           }
        }
        e.stopPropagation();
    }

    public render() {
        return (
            <div className='inputBlock'>
                <textarea value={(this.state.MessageOnChange).trimLeft()}
                          onChange={this.onChangeHandler}
                          onFocus={this.enterPressHandle}
                          placeholder="type a message"/>
                <br/>
                <button className='buttonStyle' onClick={this.saveMessage}>Send</button>
            </div>
        );
    }
}

export default InputBlock;