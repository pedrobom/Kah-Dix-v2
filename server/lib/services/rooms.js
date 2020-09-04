const RoomPlayer = require("../models/room_player");
const Room = require("../models/room");
const Results = require("../models/results")
const io = require('../../ioserver')



  // This will contain all currently existing rooms
const rooms = [];

module.exports = class Rooms {



  static createRoom = ({ roomName, hostPlayer }) => {

    if (!hostPlayer) {
        console.log("Tentativa de criar uma sala com nome [%s] sem um jogador definido", roomName)
        return { error: 'Para criar uma sala é preciso de um jogador!' };
    }
  
    if(!roomName) {
      console.debug("Tentativa de criar uma sala sem nome [retorna alerta de erro]");
      return { error: 'Para criar uma sala é preciso da nome!' };
    }
  
    console.debug("Criando uma sala com nome [%s] para o hostPlayer [%s]", roomName, hostPlayer.name)
    roomName = roomName.trim();
  
    const existingRoom = Rooms.getRoom(roomName)
    console.debug("Procurando uma sala existente [%s]", existingRoom == undefined ? "Sala disponível" : "Sala indisponível")
  
  
    if(existingRoom) {
      console.debug("Usuário [%s] tentando criar uma sala com um nome já existente [%s]", hostPlayer.name, roomName);
      return { error: 'Uma sala com esse nome já existe!' };
    }
  
    // Isso é o que uma nova sala representa
    
    const room = new Room({name: roomName, hostPlayer})

    rooms.push(room);
    console.log(room.deck)
    console.info("Sala criada com nome [%s] e host player [%s]", roomName, hostPlayer.name)
  
    return { room };  

  }

  static removeRoom = (roomName) => {
    console.info("Removendo usuário com nome [%s]", roomName)
    const index = rooms.findIndex((room) => room.name === roomName);
  
    if(index !== -1) return users.splice(index, 1)[0];
  }
  
  static getRoom = (roomName) => {
    console.debug("Buscando uma sala com nome [%s]", roomName)
    return rooms.find((room) => room.name === roomName);
  }
  
  // Eu pedro mudei o conceito findIndex(user) para indexOf porque dava erro.
  static getRoomOfUser = (user) => {
      console.debug("verificando nome da sala do jogador [%s]", user.name)
      return rooms.find(room => room.isUserInRoom(user))
  }
  
  static addUserToRoom = ({room, user}) => {
      const isPlayerInRoom = !!Rooms.getRoomOfUser(user)
  
      console.debug("Tentando adicionar usuário [%s] na sala [%s]", user.name, room.name)
      if (isPlayerInRoom){
          console.debug("Usuário [%s] já está em uma sala", user)
          return { error: "Você já está em uma sala em andamento." }
      } else if (room.isUserWithNameInRoom(user.name)){
        console.debug("usuário [%s] tentando entrar na sala [%s] com nome já existente.", user.name, room.name )
        return { error: "esse nome de usuário já existe na sala!"}
      }
      else {
          console.debug("Adicionando usuário [%s] à sala [%s]", user, room)
          room.players.push(new RoomPlayer({user: user}))        
      }
  
      return {}
  }
  
  static startGame = ({user, room}) => {
    console.log("O jogador [%s] está iniciando o jogo na sala [%s]", user.id, room.name)
    if(room.state != Room.States.WAITING_FOR_PLAYERS && room.state != Room.States.GAME_ENDED) {
      console.log("usuário [%s] está tentando iniciar o jogo na sala [%s] e o estado atual é [%s]", user.id, room.name, room.state)
      return {error: "Esse jogo ainda está rolando."}
    }
    if (room.host.id != user.id) {
      console.warn("Usuário [%s] está tentando começar o jogo na sala [%s] mas não é o host!", user.id, room.name)
      return {error: "Você não pode começar o jogo nessa sala, você não é o anfitrião!"}
    }  
  
    Rooms.dealInitCardsWithoutReposition(room);
    room.players = shuffle(room.players)
    room.state = Room.States.PICKING_PROMPT
    
  
    console.log("A sala [%s] está agora no estado PICKING_PROMPT");

    return {}
  
  }
  
  static emitRoomDataForAll = (room, io) => {
    console.info("Emitindo roomData para os sockets conectados na sala [%s]", room.name)
    room.players.forEach((player) => {
      Rooms.emitRoomDataForPlayer(room, player, io)      
    })
  }

  static getRoomDataForUser = ({ room , user }) => {
    let player = room.getPlayerForUser(user)
    return  Rooms.getRoomDataForPlayer(room , player)
  }

  static getRoomDataForPlayer = ( room , player) => {
    return  {
      myUserName: player.user.name ,
      myHand: player.hand,
      mySelectedCard: player.mySelectedCard,
      name: room.name,
      state: room.state,
      turn: room.turn,
      currentPlayerIndex: room.currentPlayerIndex,
      host: room.host,
      prompt: room.prompt,
      selectedCardCount: room.selectedCardCount,
      results: room.results,
      votingCardsTurn: room.state == Room.States.VOTING ? room.players.map((player) => {
        return player.selectedCard
      }) : null,
      players: room.players.map((player) => {
        return {
          name: player.user.name,
          score: player.score,
          selectedCard: room.state == Room.States.PICKING_PROMPT ? player.selectedCard : !!player.selectedCard,
          votedCard: room.state.PICKING_PROMPT ? player.votedCard : !!player.votedCard
        }
      })
    }
  }

  static emitRoomDataForPlayer = (room, player, io) => {
    console.debug("emitindo RoomData para usuário [%s]", player.user.id)
    var roomData = Rooms.getRoomDataForPlayer(room, player)
    io.to(player.user.id).emit('roomData', roomData)
  }
  static setOnGoingGameRoomState = (room) => {
    room.state = RoomStates.ONGOING_GAME
  }
  
  static setGameState = (room, gameState) => {
    room.gameState = gameState
  }
  
  // SÓ CHAMAR QUANDO O GAME STARTAR - socket.on("gameStart")
  static dealInitCardsWithoutReposition = (room) => {
    console.debug("Começando a distribuir as cartas para os jogadores da sala [%s]", room.name)
    
    room.players.forEach( player => {
      console.debug("Distribuindo as cartas para o jogador [%s]", player.user.name)
    
        for (var i = 0; i < 5; i++){
          shuffle(room.deck);    
          var randomCard = room.deck[0]
  
          player.hand.push(randomCard)
  
          room.deck.splice(0, 1)
        }
      }
  
    )
    
    console.debug("Distribuição de cartas para os jogadores da sala [%s] concluída!", room.name)
  }
  
  // Selecionar o prompt para um usuário da sala
  static setPromptForUser = ({user, prompt, room}) => {
    console.log("Usuário [%s] escolhendo o prompt [%s] na mesa [%s]", user.id, prompt, room.name)
    
    // ATUALIZAR!!! Não foi implementado
    // if (room.players[room.currentPlayerIndex].name !== user.name) {
    //   //let currentPlayerUser = room.getCurrentPlayer().user
    //   console.warn("Usuário [] tentando escolher o prompt [%s] na mesa [] sem ser o jogador atual []!", /*user.id, prompt, room.name*/)
    //   return "Você precisa estar em um jogo para escolher o prompt!"
    // }
  
    room.prompt = prompt
    console.log("Usuário [%s] escolheu o prompt [%s] na mesa [%s], passando para o próximo estado!", user.id, prompt, room.name)
    room.state = Room.States.SELECTING_CARDS
  
  }
  
  // Selecionar uma carta para um determinado usuário em uma sala
  static setSelectedCardForUser = (user, room, card, callback, io) => {
    console.debug("Selecionar a carta [%s] para o usuário [%s] na sala [%s]", card, user.name, room.name)
  
    // Estado inválido para selecionar cartas!
    if (room.state != Room.States.SELECTING_CARDS) {
      console.warn("Usuário [%s] tentando escolher cartas quando o jogo está no estado [%s], na sala [%s]", user.id, room.state, room.name)
      return callback("Você não pode colocar uma carta agora!")
    }
  
    
    if (room.getSelectedCardForUser(user)) {
      console.warn("Usuário [%s] tentando selecionar uma carta [%s] após já ter selecionado uma carta!", user, card)
      return callback("Você já selecionou uma carta!")
    }
  
    room.setSelectedCardForUser(user, card)
    io.to(room.name).emit('message', { user: 'Andrétnik', text: `O ${user.name} colocou uma carta na mesa!` });

    let totalSelectedCards = room.getNumberOfSelectedCards()
    console.debug("Carta [%s] escolhida para o jogador [%s] na sala [%s], agora temos um total de [%s] carta(s) e [%s] jogador(es)", card, user.id, room.name, totalSelectedCards, room.players.length)
    //
    // Todas as cartas já foram escolhidas? Então devemos passar de estado para VOTING :)
    if (totalSelectedCards >= room.players.length) {
      console.info("Cartas suficientes escolhidas na sala [%s], vamos passar de estado [%s]!", room.name, room.state)
      room.selectedCardCount = totalSelectedCards
      room.state = Room.States.VOTING
    } else {
      room.selectedCardCount = totalSelectedCards
      console.log('selectedCardCount :', room.selectedCardCount)
    }
  
  }

  // Escolhendo a carta votada para um determinado usuário :)
  static setVotedCardForUser = ({user, card, room}) => {
    console.debug("Votando na carta [%s] para o usuário [%s] na sala [%s]", card, user.id, room.name)
    
    // Estado inválido para votar em cartas!
    if (room.state != Room.States.VOTING) {
      console.warn("Usuário [%s] tentando votar em cartas quando o jogo está no estado [%s], na sala [%s]", user.id, room.state, room.name)
      return ("Você não pode fazer isso!")
    }
  
    if (room.getVotedCardForUser(user)) {
      console.warn("Usuário [%s] tentando votar uma carta [%s] após já ter votado uma carta!", user, card)
      return ("Você já votou em uma carta!")
    }
  
    room.setVotedCardForUser(user, card)
      
    let totalVotedCards = room.getNumberOfVotedCards()
    console.debug("Carta [%s] votada para o jogador [%s] na sala [%s], agora temos um total de [%s] carta(s) e [%s] jogador(es)", card, user.id, room.name, totalVotedCards, room.players.length)
    //
    // Todas as cartas já foram votadas? Então devemos passar de estado para PICKING_PROMPT :)
    // Com isso devemos também garantir que todos os usuários tem 5 cartas e que temos cartas suficientes, ou acabar o jogo :)
    if (totalVotedCards >= room.players.length - 1) {
    console.info("Cartas suficientes votadas na sala [%s], vamos passar de estado!", room.name)
  
      // Temos cartas suficientes?
      if (room.deck.lenght < room.players.length) {
        console.info("Não temos mais cartas suficientes no deck, o jogo acabou!")
        room.state = Room.States.GAME_ENDED
        return
      }
      
      
      // Temos cartas suficientes então.. então hora de pontuar :)
      const currentPlayer = room.getCurrentPlayer()
      let numberOfCurrentPlayerCardVoted = 0
      room.players.forEach(player => {
        if(player.votedCard == currentPlayer.selectedCard){
          numberOfCurrentPlayerCardVoted++ 
        } 
      })
      room.players.forEach(player => {
        if(player !== currentPlayer) {
          room.players.forEach(otherPlayer => {
            if(otherPlayer.votedCard == player.selectedCard) player.score++
          })
        }
      })
      if( (numberOfCurrentPlayerCardVoted < room.players.length -1) && (numberOfCurrentPlayerCardVoted > 0) ){
        currentPlayer.score += 3
        room.players.forEach(player => {
          if(player.votedCard == currentPlayer.selectedCard){
            player.score += 3 
          }
        })         
      }
      else {
        room.players.forEach(player => {
          if(player.votedCard == currentPlayer.selectedCard){
            player.score += 2 
          }         
        })        
      }
      // Agora também precisamos distribuir mais cartas :)
      room.players.forEach( player => {
        console.debug("Distribuindo uma nova carta para o jogador [%s]", player.user.name)
        
        let randomCard = room.deck[0]
        player.hand.push(randomCard)
        room.deck.splice(0, 1)
      })

      // SALVANDO OS RESULTADOS DO TURNO
      room.results.push(
        new Results ({
        turn: room.turn,
        turnPlayer: room.players[room.currentPlayerIndex].user.name,
        turnPrompt: room.prompt,
        turnPlayerCard: room.players[room.currentPlayerIndex].selectedCard,
        players: room.players.map((player) => { return {name: player.user.name, votedCard: player.votedCard, selectedCard: player.selectedCard}})}))

      // LIMPANDO AS VARIÁVEIS PARA O PRÓXIMO TURNO 
      room.selectedCardCount = 0
      console.log('limpando contador de cartas selecionadas na sala para room.selectedCardCount ',room.selectedCardCount)
      room.mySelectedCard = null
      console.log('limpando informação da carta selecionada do jogador room.mySelectedCard ', room.mySelectedCard)
      room.players.forEach(player => player.selectedCard = null)
      console.log('limpando informação de cartas selecionadas da array room.players ')
      room.players.forEach(player => player.votedCard = null)
      console.log('limpando informação de cartas votadas da array room.players ')

      // RODANDO O JOGADOR DA RODADA (currentPlayerIndex + 1)
      if (room.currentPlayerIndex < room.players.length - 1){
        room.currentPlayerIndex += 1
        
      }
      else{
        room.currentPlayerIndex = 0
      }
      room.turn++
      console.log('avançando para o próximo turno [%s]', room.turn)
      room.prompt = null
      console.log('Passando a rodada de Picking Prompt para o jogador [%s]', room.players[room.currentPlayerIndex].user.name)
      room.state = Room.States.PICKING_PROMPT
    }
  
  }
  static removePlayerFromRoom = (userRoom, user) => {
    const player = userRoom.getPlayerForUser(user)
    const userIndex = userRoom.players.indexOf(player, 0)
    console.log(userIndex)
    userRoom.players.splice(userIndex, 1)
    if (player.user == userRoom.host){
      userRoom.host = userRoom.players[0].user
      console.log('new host is: [%s]', userRoom.host)
    }
     
  }

  static removeRoom = (userRoom) => {
    delete rooms.userRoom
    console.log('Sala [%s] removida, lista atual de salas é',userRoom.name , rooms)
  }
}



// Fisher-Yates Alghoritm aka Knuth Shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}