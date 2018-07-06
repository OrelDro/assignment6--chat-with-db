"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const socketIo_1 = require("./socketIo");
const server = http.createServer(app_1.default);
socketIo_1.default(server);
server.listen(4000, () => console.log("listening on port 4000"));
//# sourceMappingURL=index.js.map