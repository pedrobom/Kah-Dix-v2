
// This will contain all currently existing rooms
const rooms = [];

// Deck de tds as cartas hard coded - MUDAR DEPOIS!
const RoomDeck = [
  "card1", 
  "card2", 
  "card3", 
  "card4", 
  "card5", 
  "card6", 
  "card7", 
  "card8",
  "card9",
  "card10"
]

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

  console.debug("Criando uma sala com nome [%s] para o jogador [%s]", roomName, hostPlayer.id)
  roomName = roomName.trim();

  const existingRoom = getRoom(roomName)
  console.debug("Procurando uma sala existente [%s]", existingRoom == undefined ? "Sala disponível" : "Sala indisponível")


  if(existingRoom) {
    console.debug("Usuário [%s] tentando criar uma sala com um nome já existente [%s]", hostPlayer.id, roomName);
    return { error: 'Uma sala com esse nome já existe!' };
  }

  // Isso é o que uma nova sala representa
  const room = { 
      createdAt: new Date(),
      name: roomName, 
      state: RoomStates.WAITING_FOR_PLAYERS, 
      players: [hostPlayer], 
      hostPlayer: hostPlayer,
      deck: RoomDeck 
    };

  rooms.push(room);
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
    console.debug("Buscando a sala na qual o usuário [%s] está contido", user.id)
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

// SÓ CHAMAR QUANDO O GAME STARTAR - socket.on("gameStart")
const dealInitCardsWithoutReposition = (room) => {
  console.debug("Começando a distribuir as cartas para os jogadores da sala [%s]", room.name)
  
  room.players.forEach( player => {

    //Mudança pedro: let randomMultiplier = 5 (CODIGO ORIGINAL)

    
    console.debug("Distribuindo cartas para o jogador [%s]", player.name)
    
    // acho que aqui tem que ser um for
    //while(randomMultiplier > 0){
      for (var i = 0; i < 5; i++){    
        let randomMultiplier = room.deck.length
        let cardDealtIndex = Math.floor(randomMultiplier * Math.random())
        let cardDealt = room.deck[cardDealtIndex]

        player.hand.push(cardDealt)
        room.deck.splice(cardDealtIndex, 1)
      }
      //randomMultiplier -= 1
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
};
