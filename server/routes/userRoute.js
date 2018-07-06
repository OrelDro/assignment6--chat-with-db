"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController = require("../controllers");
const router = express.Router();
router.get('/', userController.getUserList);
router.post('/login', userController.Login);
router.post('/addUser', userController.addUser);
router.put('/updateUser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map