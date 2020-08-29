const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const Users = require('./users');
const Rooms = require('./rooms')

const cardBack = ["cardBack.png", "cad1.png"]

const router = require('./router');
const users = require('./users');
const { getRoomOfUser } = require('./rooms');
const { getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);



io.on('connect', (socket) => {

  console.log("[io.on('connect') - Novo usuário conectado com socket [%s]", socket.id)
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
      console.info("A sala que o usuário tentou entrar [%s] não existe ainda, vamos criar uma para ele", roomName)
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
      // mudança pedro > original = { error } = Rooms.addUserToRoom({room, user})
      Rooms.addUserToRoom({room, user})
      if (error) {
        console.error("Não foi possivel entrar na sala [%s]: [%s]", roomName, error)
        return callback(error)
      }
    }

    
    console.debug("Sala atual é: %s", room)
    console.info("Adicionando usuário [%s] para a sala [%s] no socket", user.id, room.name)
    socket.join(room.name);
    io.to(room.name).emit('message', { user: 'Andrétnik', text: `${user.name} tá na área!` });
        
    callback(null, {user, room});
  });

  // Aqui eu quero passar as informações da sala para o client,
  // para renderizar lista de usuários na sala... nome da sala... etc
  socket.on('userJoined', () =>{
    console.log("socket.on('userJoined')")
    userRoom = Rooms.getRoomOfUser(user)

    io.to(userRoom.name).emit('roomData', userRoom)
    console.log(userRoom)
    console.log('jogador [%s] pediu para todos da sala [%s] atualizarem a sua lista de jogadores.', user.name, userRoom.name)
    socket.emit('getPlayerName', user.name)
    console.log('socket emited to Chat = getPlayerName')
    socket.emit('getPlayerRoom', userRoom.name)
    console.log('socket emited to Chat = getRoomName')
  })

  /* 
  * BEGGINING OF STATE MACHINE
  * 
  */ 
  socket.on('gameStart', () =>{
    userRoom = Rooms.getRoomOfUser(user)
    Rooms.dealInitCardsWithoutReposition(userRoom);
    Rooms.setOnGoingGameRoomState(userRoom)
    
    Rooms.setGameState(userRoom, 'GAME_START')

    io.to(userRoom.name).emit('startButtonPressed')
    io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: 'Tá valendo! A partida começou!' });
  })

  socket.on('playerTurn', () => {
    userRoom = Rooms.getRoomOfUser(user)
    Rooms.setGameState(userRoom, 'PLAYER_TURN')
  })

  socket.on('resultsUpdate', () => {
    userRoom = Rooms.getRoomOfUser(user)
    Rooms.setGameState(userRoom, 'RESULTS_UPDATE')
  })

  socket.on('gameOver', () => {
    userRoom = Rooms.getRoomOfUser(user)
    Rooms.setGameState(userRoom, 'GAME_OVER')
  })
  /* 
  *
  * END OF STATE MACHINE
  */ 


  socket.on('dealCards', () =>{
    socket.emit('newHand', user.hand )
    console.log('renderizando cartas do jogador: [%s]', user.name)
  })

  socket.on('sendMessage', (message, callback) => {
    userRoom = Rooms.getRoomOfUser(user)
    console.log('jogador [%s] está mandando mensagem na sala [$s]', user.name, userRoom.name)
    io.to(userRoom.name).emit('message', { user: user.name, text: message });

    callback();
  });


  // socket.on('gameStart', () => {
  //   const user = Users.getUser(socket.id)
  //   const cards = cardBack

  //   socket.emit('startButtonPressed', false)
  //   console.debug("Usuário [%s] apertou o botão no component StartButton", user.name)
  //   io.to(user.room).emit('drawCards', cards)

  //   console.log('Jogador 1 distribuiu as cartas')
    
  // });
    

  socket.on('disconnect', () => {
    console.log("usuário saiu")
    
    const user = Users.removeUser(socket.id);
    // CORRIGIR !!! user não tem mais room 
    userRoom = Rooms.getRoomOfUser(user)
    if(user) { 
      
      io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `${user.name} meteu o pé.` });
      io.to(userRoom.name).emit('getPlayersInfo', userRoom.players)
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Servidor rodando na porta 5000.`));