import {Server} from 'socket.io';

const io = new Server(9000,{
    cors:{
        origin: 'http://localhost:3000'
    }
})

let users = [];

const addUser = (userData, socketId)=>{
    const isUserExists = users.some(user => user.sub === userData.sub);

    if (!isUserExists) {
        users.push({...userData, socketId});
    }
}

const getUser = (userId) =>{
    return users.find(user => user.sub === userId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on('connection', (socket)=>{
    console.log('User Connected')

    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUser", users);
    })

    socket.on("sendMessage", (data) => {
        const user = getUser(data.receiverId);
        io.to(user.socketId).emit('getMessage', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUser', users);
    })

})