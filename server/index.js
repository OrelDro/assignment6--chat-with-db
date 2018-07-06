"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const socketIo_1 = require("./socketIo");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/chatDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db is connected!!");
});
const server = http.createServer(app_1.default);
socketIo_1.default(server);
server.listen(4000, () => console.log("listening on port 4000"));
//# sourceMappingURL=index.js.map