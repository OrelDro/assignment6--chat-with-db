"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();
router.post('/', messageController.getMessages);
exports.default = router;
//# sourceMappingURL=messageRoute.js.map