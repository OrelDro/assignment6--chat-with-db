import Message from './Message';
import * as Db from '../db';

const convDb = new Db.Db();
const messagesPathDb = '/messages.json';
const messagesConnectionPathDb = '/messagesConnections.json';

class Conversation {
    private type: string;
    private typeId: string;
    private messages: Message[];
    private sender: string;
    private receiver: string;

    constructor(type:string, typeId: string, sender: string, receiver: string) {
        this.type = type;
        this.typeId = typeId;
        this.messages = [];
        this.sender = sender;
        this.receiver = receiver;
    }

    public buildConversation() {
        return new Promise( (resolve, reject) => {
            const messages = convDb.readFromJson(messagesPathDb);
            const msgConnection = convDb.readFromJson(messagesConnectionPathDb);
            let accessMessages = this.type === 'group'? msgConnection["groupToMessages"][this.typeId]:
                msgConnection["userToMessages"][this.typeId];
            if(accessMessages != undefined) {
                if(this.type === 'group') {
                    accessMessages.forEach( (element) => {
                        this.messages.push(messages[element]);
                    } )
                }
                else {
                    accessMessages.forEach( (element) => {
                        const msg = messages[element];
                        if( (msg.sender === this.sender && msg.receiver === this.receiver) || (msg.sender === this.receiver && msg.receiver === this.sender)) {
                            this.messages.push(msg);
                        }
                    } )
                }
                resolve(this.messages);
            }
            else {
                resolve("no messages");
            }
        })
    }

    public static saveMsgInConnection(msgId:string, type: string, connectionId:string) {
        return new Promise( (resolve) => {
            const id = connectionId;
            const msgConnection = convDb.readFromJson(messagesConnectionPathDb);
            const key = type === "group"? "groupToMessages": "userToMessages";
            if(msgConnection[key][id] == undefined) {
                msgConnection[key][id] = [];
            }
            msgConnection[key][id].push(msgId);
            convDb.writeToJson(messagesConnectionPathDb,msgConnection);
            resolve("success");
        })
    }

}

export default Conversation;
