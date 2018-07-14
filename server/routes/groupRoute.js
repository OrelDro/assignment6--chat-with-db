"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const groupController = require("../controllers/groupController");
const router = express.Router();
router.post('/addGroup', groupController.addGroup);
router.get('/', groupController.getGroupList);
router.delete('/deleteGroup', groupController.deleteGroup);
router.put('/addUserToGroup', groupController.addUserToGroup);
router.delete('/deleteUserFromGroup', groupController.deleteUserFromGroup);
router.get('/getUsersInGroup/:id', groupController.getUsersInGroup);
router.get('/getTree', groupController.getTree);
exports.default = router;
//# sourceMappingURL=groupRoute.js.map