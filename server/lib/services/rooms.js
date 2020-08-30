const RoomPlayer = require("../models/room_player");
const Room = require("../models/room");

// This will contain all currently existing rooms
const rooms = [];

const createRoom = ({ roomName, hostPlayer }) => {

  if (!hostPlayer) {
      console.log("Tentativa de criar uma sala com nome [%s] sem um jogador definido", roomName)
      return { error: 'Para criar uma sala é preciso de um jogador!' };
  }

  if(!roomName) {
    console.debug("Tentativa de criar uma sala sem nome [retorna alerta de erro]");
    return { error: 'Para criar uma sala é preciso da nome!' };
  }

  console.debug("Criando uma sala com nome [%s] para o HostPlayer [%s]", roomName, hostPlayer.name)
  roomName = roomName.trim();

  const existingRoom = getRoom(roomName)
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

const removeRoom = (roomName) => {
  console.info("Removendo usuário com nome [%s]", roomName)
  const index = rooms.findIndex((room) => room.name === roomName);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getRoom = (roomName) => {
  console.debug("Buscando uma sala com nome [%s]", roomName)
  return rooms.find((room) => room.name === roomName);
}

// Eu pedro mudei o conceito findIndex(user) para indexOf porque dava erro.
const getRoomOfUser = (user) => {
    console.debug("verificando nome da sala do jogador [%s]", user.name)
    return rooms.find(room => room.isUserInRoom(user))
}

const addUserToRoom = ({room, user}) => {
    const isPlayerInRoom = !!getRoomOfUser(user)

    console.debug("Tentando adicionar usuário [%s] na sala [%s]", user.name, room.name)
    if (isPlayerInRoom){
        console.debug("Usuário [%s] já está em uma sala", user)
        return { error: "Você já está em uma sala em andamento." }
    } else {
        console.debug("Adicionando usuário [%s] à sala [%s]", user, room)
        room.players.push(user)
    }

    return {}
}

const setOnGoingGameRoomState = (room) => {
  room.state = RoomStates.ONGOING_GAME
}

const setGameState = (room, gameState) => {
  room.gameState = gameState
}

// SÓ CHAMAR QUANDO O GAME STARTAR - socket.on("gameStart")
const dealInitCardsWithoutReposition = (room) => {
  console.debug("Começando a distribuir as cartas para os jogadores da sala [%s]", room.name)
  
  room.players.forEach( player => {
    console.debug("Distribuindo as cartas para o jogador [%s]", player.name)
  
      for (var i = 0; i < 5; i++){
        shuffle(room.deck);    
        randomCard = room.deck[0]

        player.hand.push(randomCard)

        room.deck.splice(0, 1)
      }
    }

  )
  
  console.debug("Distribuição de cartas para os jogadores da sala [%s] concluída!", room.name)
}

// Selecionar o prompt para um usuário da sala
const setPromptForUser = ({user, prompt, room}) => {
  console.log("Usuário [%s] escolhendo o prompt [%s] na mesa [%s]", user.id, prompt, room.name)

  if (!room.isCurrentPlayer(user)) {
    let currentPlayerUser = room.getCurrentPlayer().user
    console.warn("Usuário [%s] tentando escolher o prompt [%s] na mesa [%s] sem ser o jogador atual [%s]!", user.id, prompt, room.name, currentPlayerUser.id)
    return callback("Você precisa estar em um jogo para escolher o prompt!")
  }

  room.prompt = prompt
  console.log("Usuário [%s] escolheu o prompt [%s] na mesa [%s], passando para o próximo estado!", user.id, prompt, room.name)
  room.state = Room.States.SELECTING_CARDS

}

// Selecionar uma carta para um determinado usuário em uma sala
const setSelectedCardForUser = ({user, card, room}) => {
  console.debug("Selecionar a carta [%s] para o usuário [%s] na sala [%s]", card, user.id, room.name)

  // Estado inválido para selecionar cartas!
  if (room.state != Room.States.SELECTING_CARDS) {
    console.warn("Usuário [%s] tentando escolher cartas quando o jogo está no estado [%s], na sala [%s]", user.id, room.state, room.name)
    return callback("Você não pode fazer isso!")
  }

  
  if (room.getSelectedCardForUser(user)) {
    console.warn("Usuário [%s] tentando selecionar uma carta [%s] após já ter selecionado uma carta!", user, card)
    return callback("Você já selecionou uma carta!")
  }

  room.setSelectedCardForUser(user, card)
    
  let totalSelectedCards = room.getNumberOfSelectedCards()
  console.debug("Carta [%s] escolhida para o jogador [%s] na sala [%s], agora temos um total de [%s] carta(s) e [%s] jogador(es)", card, user.id, room.name, totalSelectedCards, room.players.length)
  //
  // Todas as cartas já foram escolhidas? Então devemos passar de estado para VOTING :)
  if (totalSelectedCards >= room.players.length) {
    console.info("Cartas suficientes escolhidas na sala [%s], vamos passar de estado!", room.name)
    room.state = Room.States.VOTING
  }

}

// Escolhendo a carta votada para um determinado usuário :)
const setVotedCardForUser = ({user, card, room}) => {
  console.debug("Votando na carta [%s] para o usuário [%s] na sala [%s]", card, user.id, room.name)
  
  // Estado inválido para votar em cartas!
  if (room.state != Room.States.VOTING) {
    console.warn("Usuário [%s] tentando votar em cartas quando o jogo está no estado [%s], na sala [%s]", user.id, room.state, room.name)
    return callback("Você não pode fazer isso!")
  }

  if (room.getVotedCardForUser(user)) {
    console.warn("Usuário [%s] tentando votar uma carta [%s] após já ter votado uma carta!", user, card)
    return callback("Você já votou em uma carta!")
  }

  room.setVotedCardForUser(user, card)
    
  let totalVotedCards = room.getNumberOfVotedCards()
  console.debug("Carta [%s] votada para o jogador [%s] na sala [%s], agora temos um total de [%s] carta(s) e [%s] jogador(es)", card, user.id, room.name, totalVotedCards, room.players.length)
  //
  // Todas as cartas já foram votadas? Então devemos passar de estado para PICKING_PROMPT :)
  // Com isso devemos também garantir que todos os usuários tem 5 cartas e que temos cartas suficientes, ou acabar o jogo :)
  if (totalVotedCards >= room.players.length) {
    console.info("Cartas suficientes votadas na sala [%s], vamos passar de estado!", room.name)

    // Temos cartas suficientes?
    if (room.deck.lenght < room.players.length) {
      console.info("Não temos mais cartas suficientes no deck, o jogo acabou!")
      room.state = Room.States.GAME_ENDED
      return
    }

    // Temos cartas suficientes então.. então hora de pontuar :)
    // TODO - Pontuacao!!!

    // Agora também precisamos distribuir mais cartas :)

    room.state = Room.States.PICKING_PROMPT
  }

}

// Retorna detalhes da sala compatíveis com aquilo que o usuário deve ver a nada mais
// TODO : talvez tenhamos que talhar isso de acordo com o estado.. OK
const getRoomDataForUser = ({user, room}) => {
  var roomData = {
    name: room.name,
    Host: room.Host,
    state: room.state,
    players: room.players.map((player) => {
      return {
        user: player.user,
        selectedCard: !!player.selectedCard,
        votedCard: !!player.votedCard,
      }
    })
  }

}

module.exports = 
{  
  rooms, 
  createRoom, 
  removeRoom, 
  getRoom, 
  getRoomOfUser, 
  addUserToRoom,
  dealInitCardsWithoutReposition,
  setOnGoingGameRoomState,
  setGameState,
  setSelectedCardForUser,
  getRoomDataForUser,
  setVotedCardForUser,
  setPromptForUser
  
};

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