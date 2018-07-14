import Conversation from '../models/Conversation';
import Message from '../models/Message';


export function getConversation(conversationId) {
    return new Promise((resolve, reject) => {
        Conversation.findOne({convId:conversationId.id},{_id:0,convId:0,__v:0})
            .populate('messages').then((res) => {
            resolve(res);
        }).catch((e) => {
            reject(e);
        })
    })
}

export function saveMessage(msg) {
    return new Promise((resolve,reject) => {
        const message = new Message({sender:msg.sender,receiver:msg.receiver,content:msg.content,time:msg.time});
        message.save().then((newMsg) => {
            Conversation.update({convId:msg.receiverId},{convId:msg.receiverId,"$push":{messages:newMsg._id}},
                {upsert:true, new:true}).then((res) => {
                if(res) {
                    resolve(newMsg);
                }
            }).catch((e) => { reject(e);})
        }).catch((e) => {
            reject(e);
        })
    })
}