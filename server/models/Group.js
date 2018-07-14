"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const groupSchema = mongoose.Schema({
    name: String,
    parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
    type: String,
    itemsType: { type: String, default: null },
    items: [{ type: mongoose.Schema.Types.ObjectId, refPath: 'itemsType' }]
});
exports.default = mongoose.model('Group', groupSchema);
//# sourceMappingURL=Group.js.map