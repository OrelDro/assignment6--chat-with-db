"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes = require("./routes");
const app = express();
app.use(express.json());
app.get('/', (req, res) => { res.send("hello world"); });
app.use('/users', routes.UserRoute);
app.use('/groups', routes.GroupRoute);
app.use('/messages', routes.MessageRoute);
app.use('/conversation', routes.ConversationRoute);
app.use('/tree', routes.userGroupAssociationRoute);
exports.default = app;
//# sourceMappingURL=app.js.map