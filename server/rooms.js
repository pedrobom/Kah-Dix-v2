
// This will contain all currently existing rooms
const rooms = [];

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

  console.debug("Criando uma sala com nome [%s] para o jogador [%s]", roomName, hostPlayer.id)
  roomName = roomName.trim().toLowerCase();
  
  if(!roomName) {
    console.debug("Tentativa de criar uma sala sem nome");
    return { error: 'Para criar uma sala é preciso da nome!' };
  }

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
      state: RoomState.WAITING_FOR_PLAYERS, 
      players: [hostPlayer], 
      hostPlayer: hostPlayer  
    };

  rooms.push(room);
  console.info("Sala criada com nome [%s] e host player [%s]", roomName, hostPlayer.id)

  return room;
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

const getRoomOfUser = (user) => {
    console.debug("Buscando a sala na qual o usuário [%s] está contido", user.id)
    return rooms.find(room => room.players.findIndex(user) != -1)
}

const addUserToRoom = ({room, user}) => {
    const isPlayerInRoom = !!getRoomOfUser(user)

    console.debug("Tentando adicionar usuário [%s] na sala [%s]", user, room)
    if (isPlayerInRoom){
        console.debug("Usuário [%s] já está em uma sala", user)
        return { error: "Você já está em uma sala em andamento." }
    } else {
        console.debug("Adicionando usuário [%s] à sala [%s]", user, room)
        room.players.push(user)
    }
}

module.exports = { createRoom, removeRoom, getRoom, getRoomOfUser };
