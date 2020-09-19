
const {io, app, server} = require('./ioserver')


const Users = require('./lib/services/users');
const Rooms = require('./lib/services/rooms');

io.on('connect', (socket) => {

  const session = socket.request.session

  console.log("[io.on('connect') - Nova socket conectada com id [%s]", socket.id)
  console.debug("Conteúdo de handshake da socket [%s]: %s", socket.id, JSON.stringify(socket.handshake, null, 2))
  console.debug("Conteúdo da sessão da socket [%s]: %s", socket.id, JSON.stringify(session, null, 2))

  var user;


  //
  // NOVA SOCKETIO.. VAMOS VERIFICAR SE JÁ EXISTE UM USUÁRIO NESSE NAVEGADOR
  // (USANDO AQUELE ESQUEMA DOS COOKIES, ATRAVÉS DO EXPRESS-SOCKET, que cria o
  // elemento socket.request.session)
  //

  // Essa socket já tem um usuário conectado!
  if (session && session.userId) {
    user = Users.getUser(session.userId)
    if (!user) {
      console.error("Não foi possivel encontrar o usuário do socket [%s], com ID [%s]", socket.id, session.userId)
      socket.disconnect(true)
      return;
    }
    console.log("Detectei o usuário com id [%s] para a socket com id [%s]", user.id, socket.id)
    var room = Rooms.getRoomOfUser(user)
    if (room) {
      console.log("O usuário [%s] já está na sala [%s], vou mandar os dados da sala para ele!", user.id, room.name)
      console.log('adicionando socket.id [%s] na socketRoom [%s]', socket.id, room.name)
      Rooms.emitRoomDataForAll(room, io)
    }
  }
  // Ou então é um novo usuário, que será gravado no socket!
  else {
    console.log("A socket com id [%s] é um novo usuário, criando novo usuário!", socket.id)
    var { error, user } = Users.createUser();
    if (error) {
      console.error("Não foi possível criar o usuário! [%s]", error)
      socket.disconnect(true)
      return;
    }
    session.userId = user.id;
    session.save();
    console.log("Salvando sessao da socket [%s]: ", socket.id, session)
  }

  // Neste ponto já temos um usuário, entõa vamos associar a socket a ele :)
  // ASSOCIAR SOCKET AO USUÁRIO (para saber quais sockets )
  Users.linkSocketToUser({socket, user})

  // 
  // SESSÃO DO USUÁRIO - ASSIM QUE CONECTA, ENVIAMOS OS DADOS
  // Ligado ao SessionContext do front
  //
  // Vamos mandar esses dados para o usuário :)
  console.log("Enviando dados de sessão para o usuário [%s]", user)
  let userRoom = Rooms.getRoomOfUser(user)
  if(userRoom !== undefined) socket.join(room.name)
  console.log('verificando se existem dados de partida para o usuário')
  let sessionData = {
    user: user,
    roomData: userRoom ? Rooms.getRoomDataForUser({user, room: userRoom}) : null
  }
  socket.emit('sessionData', sessionData)


  //
  // MÉTODO JOIN - USUÁRIO ENTRANDO NA SALA A PARTIR DO INPUT JOIN.JSX
  //

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


  //
  // MÉTODO GAMESTART - USUÁRIO COMEÇANDO UM JOGO - PRECISA SER HOST
  //

  socket.on('changeDeck', (isDeckDixit, isDeckEuro, isDeckNude, isDeckPeq) => {
    let userRoom = Rooms.getRoomOfUser(user)
    Rooms.setDeck(isDeckDixit, isDeckEuro, isDeckNude, isDeckPeq, userRoom)
    Rooms.emitRoomDataForAll(userRoom, io)

  })

  socket.on('victoryChange', victoryCondition => {
    let userRoom = Rooms.getRoomOfUser(user)
    Rooms.setVictory(victoryCondition, userRoom)
    Rooms.emitRoomDataForAll(userRoom, io)
  })

  socket.on('selectPeqDeck', newBool => {
    let userRoom = Rooms.getRoomOfUser(user)
    Rooms.selectPeqDeck(newBool, userRoom)
    Rooms.emitRoomDataForAll(userRoom, io)
  })

  socket.on('selectEuroDeck', newBool => {
    let userRoom = Rooms.getRoomOfUser(user)
    Rooms.selectEuroDeck(newBool, userRoom)
    Rooms.emitRoomDataForAll(userRoom, io)
  })

  socket.on('gameStart', (isDeckDixit, isDeckPeq, isDeckEuro, isDeckNude, victoryCondition ,callback) =>{
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando começar o jogo [%s] sem estar em um jogo!", user.id, card)
      return callback("Você precisa estar em um jogo para escolher uma carta!")
    }
    console.log('isDeckDixit no index. 78', isDeckDixit)
    console.log('isDeckNude no index. 78', isDeckNude)
    const {error} = Rooms.startGame({user, room: userRoom, isDeckDixit, isDeckPeq, isDeckEuro, isDeckNude, victoryCondition})
    if (error) {
      console.log("Não foi possível começar o jogo: %s", error)
      return callback(error)
    }

    io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: 'Tá valendo! A partida começou!' });
    Rooms.emitRoomDataForAll(userRoom, io)
    io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `${userRoom.players[userRoom.currentPlayerIndex].user.name} tá matutando a epígrafe!` });
    //callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))
  })

  //
  // MÉTODO PICKPROMPT - USUÁRIO DA VEZ ESCOLHE UMA FRASE
  //

  // Quando o jogador escolhe a prompt em PICKING_PROMPT, é isso que acontece :)
  socket.on('pickPrompt', (prompt, callback) => {
    // O jogador está em um jogo?
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando escolher o prompt [%s] sem estar em um jogo!", user.id, prompt)
      return callback("Você precisa estar em um jogo para escolher o prompt!")
    }
    //
    else if(userRoom.players[userRoom.currentPlayerIndex].user != user){
      console.warn("Usuário [%s] tentando escolher o prompt [%s] mas não é a vez dele!", user.name, prompt)
      return callback("Não é a sua vez de escolher uma frase!")
    }

    Rooms.setPromptForUser({user, room: userRoom, prompt})
    // if (error) {
    //   console.error("Não foi possivel escolher a carta [%s] do usuário [%s] na sala [%s]: [%s]", card, user.id,  userRoom.name, error)
    //   return callback(error)
    // }

    Rooms.emitRoomDataForAll(userRoom, io)
    io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: 'Já podem escolher a cartinha!' });
    console.log('Novo estado de Jogo : [%s]', userRoom.state)
    //CALLBACK COM PROBLEMA
    //callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))
  })

  //
  // MÉTODO SELECTCARD - USUÁRIOS ESCOLHEM UMA CARTA :)
  //

  // Quando o jogador seleciona uma carta na fase SELECTING_CARDS, é isso que acontece :)
  socket.on('selectCard', (card, callback) => {
    // O jogador está em um jogo?
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando selecionar uma carta [%s] sem estar em um jogo!", user.id, card)
      return callback("Você precisa estar em um jogo para escolher uma carta!") 
    }

    console.log("Usuário [%s] escolhendo a carta [%s] na mesa [%s]", user.id, card, userRoom)

    const error = Rooms.setSelectedCardForUser(user, userRoom, card, callback, io)
    if (error) {
      console.error("Não foi possivel escolher a carta [%s] do usuário [%s] na sala [%s]: [%s]", card, user.name,  userRoom.name, error)
      return callback(error)
    }

    Rooms.emitRoomDataForAll(userRoom, io)
    //io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `O ${user.name} colocou uma carta na mesa!` });
    //callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))

  })

  //
  // MÉTODO VOTECARD - USUÁRIOS VOTAM EM QUAL CARTA
  //

  // Quando o jogador escolhe a carta em qual está votando
  socket.on('voteCard', (card, callback) => {
    // O jogador está em um jogo?
    let userRoom = Rooms.getRoomOfUser(user)
    if (!userRoom) {
      console.warn("Usuário [%s] tentando votar em uma carta [%s] sem estar em um jogo!", user.id, card)
      return callback("Você precisa estar em um jogo para escolher uma carta!")
    }

    else if (userRoom.players[userRoom.currentPlayerIndex].user == user) {
      console.warn("Jogador [%s] tentando votar na carta [%s] no turno de Prompt dele!", user.name, card)
      return callback("Nesse turno você não vota!")    
    }

    console.log("Usuário [%s] votando na carta [%s] na mesa [%s]", user.name, card, userRoom)

    const error = Rooms.setVotedCardForUser({user, room: userRoom, card}, io)
    if (error) {
      console.error("Não foi possivel votar na carta [%s] do usuário [%s] na sala [%s]: [%s]", card, user.id,  userRoom.name, error)
      return callback(error)
    }

    Rooms.emitRoomDataForAll(userRoom, io)
    const success = "Carta Votada"
    return callback(success)
    //callback(null, Rooms.getRoomDataForUser({user, room: userRoom}))
  })

  //
  // MÉTODO SENDMESSAGE - ENVIAR MENSAGEM DE CHAT
  //

  socket.on('sendMessage', (message, callback) => {
    userRoom = Rooms.getRoomOfUser(user)
    if(userRoom != undefined )console.log('jogador [%s] está mandando mensagem [%s] na sala [%s]', user.name, message, userRoom.name)
    io.to(userRoom.name).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('quitRoom', (callback) =>{
    userRoom = Rooms.getRoomOfUser(user)
    if(userRoom !== undefined){
      io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `${user.name} meteu o pé.` })    
      Rooms.removePlayerFromRoom(userRoom, user, io)
      Rooms.emitRoomDataForAll(userRoom, io)
      return callback(`Saindo da sala ${userRoom.name}` )
    }
    return callback("Você não está nessa sala! Redirecionando para página principal")
  })

  socket.on('disconnect', () => {
    console.log("Usuário [%s] com socket [%s] desconectou do servidor", user.id, socket.id)
    Users.removeSocketFromUser({user, socket})

    userRoom = Rooms.getRoomOfUser(user)

    // SE O USUARIO ESTIVER EM UMA SALA
    if(userRoom !== undefined){
      // SE O USUARIO ESTIVER NO ROOMLOBBY
      if(user.socketIds.length == 0 && userRoom.state !== "WAITING_FOR_PLAYERS" ) {
        io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `Aí, se liga, ${user.name} caiu.` })
        io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `Bora marcar um 10 (5min) e se não voltar a gente continua?` })
        Rooms.emitRoomDataForAll(userRoom, io)
      }
      // SE O USUARIO ESTIVER NO MEIO DO JOGO
      else if(user.socketIds.length == 0 && userRoom.state == "WAITING_FOR_PLAYERS" ) {
        Rooms.removePlayerFromRoom(userRoom, user, io)
        io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `${user.name} meteu o pé.` })
        Rooms.emitRoomDataForAll(userRoom, io)
      }

      // SE O USUARIO ESTIVER NUMA PARTIDA ONDE SÓ TEM ELE MESMO
      else if(user.socketIds.length == 0 && userRoom.state !== "WAITING_FOR_PLAYERS" && userRoom.players.length == 1){
        Rooms.removePlayerFromRoom(userRoom, user)
        Rooms.removeRoom(userRoom)
      }  

      // FALTA CRIAR ELIMINAR SALA ONDE TENHA JOGADORES MAS TODOS ESTÃO SEM SOCKETS   
    }

    // DESCOBRIR SE É POSSÍVEL RECONECTAR
    // AGORA NÃO PODEMOS MAIS REMOVER O USUÁRIO PORQUE ELE PODE VOLTAR..
    // const user = Users.removeUser(socket.id);
    // userRoom = Rooms.getRoomOfUser(user)
    // if (userRoom) {
    //   io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `${user.name} meteu o pé.` });
    //   if (userRoom.state == "WAITING_FOR_PLAYERS") {
    //     if (user == userRoom.host && userRoom.players.length >= 2) {
    //       Rooms.removePlayerFromRoom(userRoom, user)
    //       io.to(userRoom.name).emit('message', { user: 'Andrétnik', text: `O ${userRoom.host.name} é o novo anfitrião da partida!` });
    //       console.log(' Host [%s] saiu do RoomLobby, removendo jogador da sala e definindo o novo Host para [%s]', user.name, userRoom.host.name)
    //       Rooms.emitRoomDataForAll(userRoom, io)
    //     }
    //     else if (userRoom.players.length > 1) {
    //       Rooms.removePlayerFromRoom(userRoom, user)
    //       Rooms.emitRoomDataForAll(userRoom, io)
    //       console.log('removendo jogador [%s] da sala [%s] porque ele saiu do RoomLobby', user.name, userRoom.name)
    //     }
    //     else {
    //       console.log('não existe mais ninguem na sala, sala será deletada.')
    //       Rooms.removeRoom(userRoom)
    //     }
    //   }
    // }
    // else (!userRoom)
  })
});


// Inicializando o servidor
let PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}.`));