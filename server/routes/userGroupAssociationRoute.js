"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userGroupAssociationController = require("../controllers/userGroupAssociationController");
const router = express.Router();
router.get('/getTree', userGroupAssociationController.getTree);
router.put('/addUserToGroup', userGroupAssociationController.addUserToGroup);
router.delete('/delete', userGroupAssociationController.deleteGroupChildrens);
router.delete('/deleteUserFromGroup', userGroupAssociationController.deleteUserFromGroup);
router.get('/getUsersInGroup/:groupId', userGroupAssociationController.getUsersInGroup);
exports.default = router;
//# sourceMappingURL=userGroupAssociationRoute.js.map