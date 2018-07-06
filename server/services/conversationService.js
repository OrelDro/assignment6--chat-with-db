"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Conversation_1 = require("../models/Conversation");
const Message_1 = require("../models/Message");
const uuid_1 = require("uuid");
function buildConversation(type, id, sender, receiver) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const conversation = new Conversation_1.default(type, id, sender, receiver);
        const returnConversation = yield conversation.buildConversation();
        resolve(returnConversation);
    }));
}
exports.buildConversation = buildConversation;
function saveMessage(msg) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        const id = uuid_1.v4();
        const newMessage = new Message_1.default(id, msg["sender"], msg["receiverName"], msg["content"], msg["time"]);
        const msgRet = yield Message_1.default.setMessage(newMessage);
        const result = yield Conversation_1.default.saveMsgInConnection(id, msg["type"], msg["receiverId"]);
        if (result == "success") {
            resolve(msgRet);
        }
        resolve("failed");
    }));
}
exports.saveMessage = saveMessage;
//# sourceMappingURL=conversationService.js.map