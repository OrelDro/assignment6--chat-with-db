"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Db = require("../db");
const convDb = new Db.Db();
const messagesPathDb = '/messages.json';
const messagesConnectionPathDb = '/messagesConnections.json';
class Conversation {
    constructor(type, typeId, sender, receiver) {
        this.type = type;
        this.typeId = typeId;
        this.messages = [];
        this.sender = sender;
        this.receiver = receiver;
    }
    buildConversation() {
        return new Promise((resolve, reject) => {
            const messages = convDb.readFromJson(messagesPathDb);
            const msgConnection = convDb.readFromJson(messagesConnectionPathDb);
            let accessMessages = this.type === 'group' ? msgConnection["groupToMessages"][this.typeId] :
                msgConnection["userToMessages"][this.typeId];
            if (accessMessages != undefined) {
                if (this.type === 'group') {
                    accessMessages.forEach((element) => {
                        this.messages.push(messages[element]);
                    });
                }
                else {
                    accessMessages.forEach((element) => {
                        const msg = messages[element];
                        if ((msg.sender === this.sender && msg.receiver === this.receiver) || (msg.sender === this.receiver && msg.receiver === this.sender)) {
                            this.messages.push(msg);
                        }
                    });
                }
                resolve(this.messages);
            }
            else {
                resolve("no messages");
            }
        });
    }
    static saveMsgInConnection(msgId, type, connectionId) {
        return new Promise((resolve) => {
            const id = connectionId;
            const msgConnection = convDb.readFromJson(messagesConnectionPathDb);
            const key = type === "group" ? "groupToMessages" : "userToMessages";
            if (msgConnection[key][id] == undefined) {
                msgConnection[key][id] = [];
            }
            msgConnection[key][id].push(msgId);
            convDb.writeToJson(messagesConnectionPathDb, msgConnection);
            resolve("success");
        });
    }
}
exports.default = Conversation;
//# sourceMappingURL=Conversation.js.map