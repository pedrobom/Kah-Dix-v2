const users = [];

const addUser = ({ id, name, room }) => {
  console.debug("Tentando adicionar usuário com nome [%s] com socket [%s] na sala [%s]", name, id, sala)
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);
  console.debug("Usuário encontrado [%s]", user)

  if(!name || !room) {
    console.debug("Usuário tentou entrar sem nome ou sala");
    return { error: 'Username and room are required.' };
  }

  if(existingUser) {
    console.debug("Usuário tentando entrar com nome que já existe [%s] na sala [%s]", name, room);
    return { error: 'Username is taken.' };
  }

  const user = { id, name, room, isFirst };

  users.push(user);
  console.info("Usuário adicionado [%s]", user)

  return { user };
}

const removeUser = (id) => {
  console.info("Removendo usuário com id [%s]", id)
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
  console.debug("Buscando usuário com id [%s]", id)
  return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => { 
  console.debug("Buscando usuários da sala [%s]", room)
  return users.filter((user) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };