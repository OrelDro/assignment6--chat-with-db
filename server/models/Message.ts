import * as Db from '../db';

const messageDb = new Db.Db();
const messageDbPath = "/messages.json";

class Message {
    private id: string;
    private sender: string;
    private receiver: string;
    private content: string;
    private time: string;

    constructor(id: string,from: string, to: string, content: string, time: string) {
        this.id = id;
        this.sender = from;
        this.receiver = to;
        this.content = content;
        this.time = time;
    }
    public static getMessages() {
        return new Promise( (resolve,reject) => {
            const messages = messageDb.readFromJson('/messages.json');
            resolve(messages);
        })
    }

    public static setMessage(message:Message) {
        return new Promise( (resolve) => {
            const messages = messageDb.readFromJson(messageDbPath);
            messages[message.id] = {
                sender:message.sender,
                receiver:message.receiver,
                content:message.content,
                time:message.time
            }
            messageDb.writeToJson(messageDbPath,messages);
            resolve(message);
        })
    }

}

export default Message;