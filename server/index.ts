import * as http from 'http';
import app from './app';
import socket from './socketIo';
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chatDB');

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("db is connected!!");
});

const server = http.createServer(app);
socket(server);

server.listen(4000, () => console.log("listening on port 4000"));