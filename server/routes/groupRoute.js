"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const groupController = require("../controllers/groupController");
const router = express.Router();
router.post('/addGroup', groupController.addGroup);
router.get('/', groupController.getGroupList);
router.delete('/deleteGroup', groupController.deleteGroup);
exports.default = router;
//# sourceMappingURL=groupRoute.js.map