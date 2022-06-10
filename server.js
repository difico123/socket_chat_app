const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const formatMessage = require('./utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    joinUser
} = require('./utils/users');


const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room, image }) => {

        const user = joinUser(socket.id, room, username, image);

        socket.join(room)

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!', user.image));

        // Broadcast when a user connects
        socket.broadcast
            .to(room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`, user.image)
            );

        // Send users and room info
        io.to(room).emit('roomUsers', {
            room: room,
            users: getRoomUsers(room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', ({ msg, room }) => {

        const user = getCurrentUser(socket.id, room);

        socket.broadcast
            .to(room)
            .emit(
                'message',
                formatMessage(user.username, msg, user.image));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const { user, chatRooms } = userLeave(socket.id);
        console.log("🚀 ~ file: server.js ~ line 61 ~ socket.on ~ user, chatRooms", user, chatRooms)

        if (user) {
            for (let i = 0; i < chatRooms.length; i++) {
                io.to(chatRooms[i]).emit(
                    'message',
                    formatMessage(botName, `${user.username} has left the chat`, user.image)
                );

                // Send users and room info
                io.to(chatRooms[i]).emit('roomUsers', {
                    room: chatRooms[i],
                    users: getRoomUsers(chatRooms[i])
                });
            }

        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(3000, () => {
    console.log('listening on *:3000');
});