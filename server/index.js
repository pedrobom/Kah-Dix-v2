
const {io, server} = require('./ioserver')
const express = require('express');
const app = express();

const cors = require('cors');
const router = require('./router');

const Users = require('./lib/services/users');
const Rooms = require('./lib/services/rooms')

app.use(cors());
app.use(router);

io.on('connect', (socket) => {

  console.log("[io.on('connect') - Novo usuário conectado com socket [%s]", socket.id)
  // Assim que o usuário conecta, a gente cria um usuário para ele
  const { error, user } = Users.addUser({ id: socket.id });

  // Este metodo representa um usuário tentando entrar em uma sala
  socket.on('join', ({ name, roomName }, callback) => {
    console.log("Usuário [%s] tentando entrar com nome [%s] na sala com nome [%s]", user.id, name, roomName)

    // Se o usuário já está em uma sala, não pode fazer isso!
    var userRoom = Rooms.getRoomOfUser(user);
    if (userRoom) {
      console.error("O usuário [%s] já está na sala [%s] mas está tentando entrar na sala [%s]", user.id, userRoom.name, roomName)
      return callback("Você já está em uma sala!")  
    }

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
      var {error} = Rooms.addUserToRoom({room, user})
      if (error) {
        console.error("Não foi possivel entrar na sala [%s]: [%s]", roomName, error)
        return callback(error)
      }
    }

    
    console.debug("Sala atual é: %s", room)
    console.info("Adicionando usuário [%s] para a sala [%s] no socket", user.id, room.name)
    socket.join(room.name);

    io.to(room.name).emit('message', { user: 'Andrétnik', text: `${user.name} tá na área!` });

    Rooms.emitRoomDataForAll(room, io)

    callback(null, Rooms.getRoomDataForUser({user, room}))
        
  });


  // Quando o jogador escolhe a prompt em PICKING_PROMPT, é isso que acontece :)
  socket.on('pickPrompt', ({prompt}, callback) => {
    // O jogador está em um jogo?
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando escolher o prompt [%s] sem estar em um jogo!", user.id, prompt)
      return callback("Você precisa estar em um jogo para escolher o prompt!")
    }

    const {error} = Rooms.setPromptForUser({user, room: userRoom, prompt})
    if (error) {
      console.error("Não foi possivel escolher a carta [%s] do usuário [%s] na sala [%s]: [%s]", card, user.id,  userRoom.name, error)
      return callback(error)
    }

    Rooms.emitRoomDataForAll(userRoom, io)
    callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))
  })

  // Quando o jogador seleciona uma carta na fase SELECTING_CARDS, é isso que acontece :)
  socket.on('selectCard', ({card}, callback) => {
    // O jogador está em um jogo?
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando selecionar uma carta [%s] sem estar em um jogo!", user.id, card)
      return callback("Você precisa estar em um jogo para escolher uma carta!")
    }

    console.log("Usuário [%s] escolhendo a carta [%s] na mesa [%s]", user.id, card, userRoom)

    const {error} = Rooms.setSelectedCardForUser({user, room: userRoom, card})
    if (error) {
      console.error("Não foi possivel escolher a carta [%s] do usuário [%s] na sala [%s]: [%s]", card, user.id,  userRoom.name, error)
      return callback(error)
    }

    Rooms.emitRoomDataForAll(userRoom, io)
    callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))

  })

  // Quando o jogador escolhe a carta em qual está votando
  socket.on('voteCard', ({card}, callback) => {
    // O jogador está em um jogo?
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando selecionar uma carta [%s] sem estar em um jogo!", user.id, card)
      return callback("Você precisa estar em um jogo para escolher uma carta!")
    }

    console.log("Usuário [%s] votando na carta [%s] na mesa [%s]", user.id, card, userRoom)

    const {error} = Rooms.setVotedCardForUser({user, room: userRoom, card})
    if (error) {
      console.error("Não foi possivel votar na carta [%s] do usuário [%s] na sala [%s]: [%s]", card, user.id,  userRoom.name, error)
      return callback(error)
    }

    Rooms.emitRoomDataForAll(userRoom, io)
    callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))
  })

  // Aqui eu quero passar as informações da sala para o client,
  // para renderizar lista de usuários na sala... nome da sala... etc
  
  // socket.on('userJoined', () =>{
  //   console.log("socket.on('userJoined')")
  //   userRoom = Rooms.getRoomOfUser(user)

  //   Rooms.emitRoomDataForAll(userRoom, io)
  //   console.log(userRoom)
  //   console.log('jogador [%s] pediu para todos da sala [%s] atualizarem os dados da sala', user.name, userRoom.name)
  //   socket.emit('getPlayerName', user.name)
  //   console.log('socket emited to Chat = getPlayerName')
  //   socket.emit('getPlayerRoom', userRoom.name)
  //   console.log('socket emited to Chat = getRoomName')
  // })

  // Isso é quando o jogador 
  socket.on('gameStart', (callback) =>{
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando começar o jogo [%s] sem estar em um jogo!", user.id, card)
      return callback("Você precisa estar em um jogo para escolher uma carta!")
    }

    const {error} = Rooms.startGame({user, room: userRoom})
    if (error) {
      console.log("Não foi possível começar o jogo: %s", error)
      return callback(error)
    }

    io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: 'Tá valendo! A partida começou!' });
    Rooms.emitRoomDataForAll(userRoom, io)
    io.to(userRoom.name).emit('dispararInputPOPUP')
    io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `é a vez do ${userRoom.players[userRoom.currentPlayerIndex].user.name}` });
    console.log('dispararInputPOPUP')
    //callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))
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
    console.log("Usuário [%s] saiu", socket.id)
    
    const user = Users.removeUser(socket.id);
    // CORRIGIR !!! user não tem mais room 
    userRoom = Rooms.getRoomOfUser(user)
    if(user && userRoom) { 
      io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `${user.name} meteu o pé.` });
      io.to(userRoom.name).emit('getPlayersInfo', userRoom.players)
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Servidor rodando na porta 5000.`));