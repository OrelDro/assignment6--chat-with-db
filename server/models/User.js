"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    age: Number,
    type: String
});
exports.default = mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map