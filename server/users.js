const users = [];

const addUser = ({ id}) => {
  console.debug("Tentando adicionar usuário com id [%s] ", id)

  const existingUser = users.find((user) => user.id === id);
  console.debug("Procurando usuário existente com id [%s]: %s", id, existingUser == undefined ? "ID disponível" : "ID indisponível")

  if(existingUser) {
    console.debug("Usuário tentando entrar com nome ID já existe [%s]", id);
    return { error: 'Username ID is taken.' };
  }

  const user = { id, name: "Mr. LIMBO" };

  users.push(user);
  console.info("Usuário adicionado com ID [%s] adicionado, agora temos [%s] usuário(s)", user.id, users.length)

  return { user };
}


// const addUser = ({ id, name, room }) => {
//   console.debug("Tentando adicionar usuário com nome [%s] com socket [%s] na sala [%s]", name, id, room)
//   name = name.trim().toLowerCase();
//   room = room.trim().toLowerCase();

//   const existingUser = users.find((user) => user.room === room && user.name === name);
//   console.debug("Procurando nome de usuário existente [%s]", existingUser == undefined ? "Nome disponível" : "Nome indisponível")

//   if(!name || !room) {
//     console.debug("Usuário tentou entrar sem nome ou sala");
//     return { error: 'Username and room are required.' };
//   }

//   if(existingUser) {
//     console.debug("Usuário tentando entrar com nome que já existe [%s] na sala [%s]", name, room);
//     return { error: 'Username is taken.' };
//   }

//   const user = { id, name, room };

//   users.push(user);
//   console.info("Usuário adicionado [%s], agora temos [%s] usuário(s)", user, users.length)

//   return user;
// }

const removeUser = (id) => {
  console.info("Removendo usuário com id [%s]", id)
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
  console.debug("Buscando usuário com id [%s]", id)
  return users.find((user) => user.id === id);
}
// Pedro diz: acho que essa função tá desatualizada, não funcional.
// porque não existe user.room
const getUsersInRoom = (room) => { 
  console.debug("Buscando usuários da sala [%s]", room)
  return users.filter((user) => user.room === room);
} 

const changeUserName = (user, name) => {
  console.log(`Usuário [${user.id}] trocou o nome de [${user.name}] para [${name}]`)
  user.name = name
}


module.exports = { users, addUser, removeUser, getUser, getUsersInRoom, changeUserName};