import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { v4 as uuid } from 'uuid';


export function buildConversation(type:string, id:string, sender:string, receiver:string) {
    return new Promise( async (resolve, reject) => {
        const conversation = new Conversation(type, id, sender, receiver);
        const returnConversation = await conversation.buildConversation();
        resolve(returnConversation);
    })
}

export function saveMessage(msg: {}) {
    return new Promise( async (resolve) => {
        const id = uuid();
        const newMessage = new Message(id, msg["sender"], msg["receiverName"], msg["content"], msg["time"]);
        const msgRet = await Message.setMessage(newMessage);
        const result = await Conversation.saveMsgInConnection(id,msg["type"],msg["receiverId"]);
        if(result == "success") {
            resolve(msgRet);
        }
        resolve("failed");
    })
}