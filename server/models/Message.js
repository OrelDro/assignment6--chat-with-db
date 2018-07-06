"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Db = require("../db");
const messageDb = new Db.Db();
const messageDbPath = "/messages.json";
class Message {
    constructor(id, from, to, content, time) {
        this.id = id;
        this.sender = from;
        this.receiver = to;
        this.content = content;
        this.time = time;
    }
    static getMessages() {
        return new Promise((resolve, reject) => {
            const messages = messageDb.readFromJson('/messages.json');
            resolve(messages);
        });
    }
    static setMessage(message) {
        return new Promise((resolve) => {
            const messages = messageDb.readFromJson(messageDbPath);
            messages[message.id] = {
                sender: message.sender,
                receiver: message.receiver,
                content: message.content,
                time: message.time
            };
            messageDb.writeToJson(messageDbPath, messages);
            resolve(message);
        });
    }
}
exports.default = Message;
//# sourceMappingURL=Message.js.map