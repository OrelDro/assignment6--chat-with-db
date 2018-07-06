import * as fs from 'fs';

class DB {
    public data: any;

    readFromJson(fileName) {
        const data: any = fs.readFileSync(__dirname + fileName);
        return JSON.parse(data);
    }

    writeToJson(fileName, data) {
        fs.writeFileSync(__dirname + fileName, JSON.stringify(data));
    }

}

export default DB;