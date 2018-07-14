"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation_1 = require("../models/Conversation");
const Message_1 = require("../models/Message");
function getConversation(conversationId) {
    return new Promise((resolve) => {
        Conversation_1.default.findOne({ convId: conversationId.id }, { _id: 0, convId: 0, __v: 0 })
            .populate('messages').then((res) => {
            resolve(res);
        });
    });
}
exports.getConversation = getConversation;
function saveMessage(msg) {
    return new Promise((resolve, reject) => {
        const message = new Message_1.default({ sender: msg.sender, receiver: msg.receiver, content: msg.content, time: msg.time });
        message.save().then((newMsg) => {
            Conversation_1.default.update({ convId: msg.receiverId }, { convId: msg.receiverId, "$push": { messages: newMsg._id } }, { upsert: true, new: true }).then((res) => {
                if (res) {
                    resolve(newMsg);
                }
            });
        }).catch((e) => {
            reject(e);
        });
    });
}
exports.saveMessage = saveMessage;
//# sourceMappingURL=conversationService.js.map