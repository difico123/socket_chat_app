const rooms = {}

const joinUser = (id, room, username, image) => {
    let roomUser = { id, username, image };
    if (!rooms[room]) {
        rooms[room] = [roomUser];
        return roomUser
    }
    let userExist = rooms[room].findIndex((user => user.id === id));
    if (userExist < 0) {
        rooms[room].push(roomUser);
    }
    return roomUser;
}

function getCurrentUser(id, room) {
    let user = rooms[room].find(user => user.id === id);
    return user;
}

function userLeave(id) {
    let chatRooms = [];
    let user = undefined
    for (let key in rooms) {
        let index = rooms[key].findIndex(user => user.id === id);
        if (index === -1) {
            continue;
        }
        chatRooms.push(key)
        if (!user) {
            let roomUsers = rooms[key]
            user = roomUsers[index]
        }
        rooms[key].splice(index, 1)
    }

    return { user, chatRooms }
}

function getRoomUsers(room) {
    return rooms[room];
}

module.exports = {
    getCurrentUser,
    userLeave,
    getRoomUsers,
    joinUser
};