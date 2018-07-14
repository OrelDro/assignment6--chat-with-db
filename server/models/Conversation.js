"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const conversationSchema = mongoose.Schema({
    convId: mongoose.Schema.Types.ObjectId,
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});
exports.default = mongoose.model('Conversation', conversationSchema);
//# sourceMappingURL=Conversation.js.map