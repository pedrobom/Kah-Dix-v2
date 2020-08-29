
// This will contain all currently existing rooms
const rooms = [];


// Deck de tds as cartas hard coded - MUDAR DEPOIS!
const RoomDeck = [
]

createDeck = () =>{
  for (var i = 1; i < 98; i++){
    let card = `card${i}`
    RoomDeck.push(card)    
  }

}

// Isso define os possiveis estados de um jogo / sala
const RoomStates = {
    WAITING_FOR_PLAYERS: "WAITING_FOR_PLAYERS",
    ONGOING_GAME: "ONGOING_GAME"
}

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
  
  const room = { 
      createdAt: new Date(),
      name: roomName, 
      state: RoomStates.WAITING_FOR_PLAYERS, 
      players: [hostPlayer], 
      Host: hostPlayer,
      deck: RoomDeck,
      state: '' 
    };
  
  rooms.push(room);
  createDeck();
  console.log(RoomDeck)
  hostPlayer.isHost = true
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
    return rooms.find(room => room.players.indexOf(user) != -1)
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
}

const setRoomState = (room, state) => {
  room.state = state
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

module.exports = 
{  
  rooms, 
  createRoom, 
  removeRoom, 
  getRoom, 
  getRoomOfUser, 
  addUserToRoom,
  dealInitCardsWithoutReposition,
  setRoomState
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