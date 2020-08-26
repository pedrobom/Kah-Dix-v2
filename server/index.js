const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const cardBack = ["cardBack.png", "cad1.png"]

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    console.log("Usuário [%s] tentando entrar na sala [%s]", name, room)
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(`${user.name} criado`)
    if(error) return callback(error);
    socket.join(user.room);

    socket.emit('message', { user: 'Andrétnik', text: `${user.name} tá na área!`});
    socket.broadcast.to(user.room).emit('message', { user: 'Andrétnik', text: `${user.name} tá na área!` });
        
    // callback();
  });

  socket.on('askRoomData', () => {
    socket.emit
  })

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });


  socket.on('gameStart', () => {
    const user = getUser(socket.id)
    const cards = cardBack

    socket.emit('startButtonPressed', false)
    io.to(user.room).emit('drawCards', cards)

    console.log('Jogador 1 distribuiu as cartas')
    
  });
    

  socket.on('disconnect', () => {
    console.log("usuário saiu")
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} meteu o pé.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Servidor rodando na porta 5000.`));