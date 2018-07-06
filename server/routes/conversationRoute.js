"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const conversationController = require("../controllers/conversationController");
const router = express.Router();
router.post('/', conversationController.getConversation);
router.put('/saveMsg', conversationController.setMessages);
exports.default = router;
//# sourceMappingURL=conversationRoute.js.map