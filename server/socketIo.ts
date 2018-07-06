import * as socketio from 'socket.io';

export default function socket(httpServer){
    const io = socketio.listen(httpServer);
    io.on('connection', (socket)=>{
        console.log('a user connected');

        socket.on('login', (username)=>{
            socket.username = username;
            console.log(`username ${username} was logged in!`);
            socket.broadcast.emit('connections', username);
        });

        socket.on('joinToGroup', (username, groupId)=>{
            console.log(`username: ${username} has joined to group: ${groupId}`);
            socket.join(groupId);
        });

        socket.on('sendMessage', (id, msg)=>{
            socket.broadcast.to(id).emit('msg', msg);
        });

        socket.on('leaveFromGroup', (username, groupId)=>{
            socket.leave(groupId);
            console.log(`username: ${username} left ${groupId}`);
        });

        socket.on('logout', (username)=>{
            console.log(`user: ${username} disconnected`);
        });
    });
}