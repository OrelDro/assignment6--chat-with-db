"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class DB {
    readFromJson(fileName) {
        const data = fs.readFileSync(__dirname + fileName);
        return JSON.parse(data);
    }
    writeToJson(fileName, data) {
        fs.writeFileSync(__dirname + fileName, JSON.stringify(data));
    }
}
exports.default = DB;
//# sourceMappingURL=db.js.map