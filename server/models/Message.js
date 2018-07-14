"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const messageSchema = mongoose.Schema({
    sender: String,
    receiver: String,
    content: String,
    time: String
});
exports.default = mongoose.model('Message', messageSchema);
//# sourceMappingURL=Message.js.map