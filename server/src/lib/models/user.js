// Esse módulo representa um usuário e suas informações
module.exports = class User {

    constructor({id, name}){
        this.createdAt = new Date()
        this.id = id
        this.name = name
        this.socketIds = []
    }

    hasSocket(id) {
        return this.socketIds.find((socketId) => socketId == id)
    }

    toString() {
        return this.id
    }

}