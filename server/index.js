const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const Users = require('./users');
const Rooms = require('./rooms')

const cardBack = ["cardBack.png", "cad1.png"]

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {

  console.log("Novo usuário conectado com socket [%s]", socket.id)
  // Assim que o usuário conecta, a gente cria um usuário para ele
  const { error, user } = Users.addUser({ id: socket.id });

  // Este metodo representa um usuário tentando entrar em uma sala
  socket.on('join', ({ name, roomName }, callback) => {
    console.log("Usuário [%s] tentando entrar com nome [%s] na sala com nome [%s]", user.id, name, roomName)

    // 1 - Não poderá haver duas pessoas com o mesmo nome em uma sala
    // ou - Duas pessoas não podem ter o mesmo nome independente da sala
    //
    Users.changeUserName(user, name)

    var room = Rooms.getRoom(roomName)
    // Sala ainda não existe.. vamos criar uma :)
    if(!room) {
      console.info("A sala que o usuário tentou entrar [%s] não existem ainda, vamos criar uma para ele ", roomName)
      var { error, room } = Rooms.createRoom({roomName, hostPlayer: user})
      if (error) {
        console.error("Não foi possivel criar a sala! [%s]", error)
        return callback(error)
      }
      console.info("Sala [%s] criada para o usuário [%s]", roomName, user.id)
    } 
    // Sala já existe, então vamos jogar nosso usuário lá dentro!
    else {
      console.info("A sala [%s] que o usuário [%s] está tentando acessar já existe, colocando ele como jogador!", roomName, user.id)
      let { error } = Rooms.addUserToRoom({room, user})
      if (error) {
        console.error("Não foi possivel entrar na sala [%s]: [%s]", roomName, error)
        return callback(error)
      }
    }
    
    console.debug("Sala atual é: %s", room)
    console.info("Adicionando usuário [%s] para a sala [%s] no socket", user.id, room.name)
    socket.join(room.name);
    socket.broadcast.to(room.name).emit('message', { user: 'Andrétnik', text: `${user.name} tá na área!` });
        
    callback(null, {user, room});
  });

  socket.on('sendMessage', (message, callback) => {
    const user = Users.getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });


  socket.on('gameStart', () => {
    const user = Users.getUser(socket.id)
    const cards = cardBack

    socket.emit('startButtonPressed', false)
    console.debug("Usuário [%s] apertou o botão no component StartButton", user.name)
    io.to(user.room).emit('drawCards', cards)

    console.log('Jogador 1 distribuiu as cartas')
    
  });
    

  socket.on('disconnect', () => {
    console.log("usuário saiu")
    const user = Users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} meteu o pé.` });
      io.to(user.room).emit('roomData', { room: user.room, users: Users.getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Servidor rodando na porta 5000.`));