// alterar o path quando for para a pasta 'src'
const io = require('../src/ioserver')

module.exports = class SocketEmitter {
    static emitRoomDataForPlayer(event, io, sockectId, room) {
        io.to(sockectId).emit(event, room)
    }

    static emitRoomDataForAll(event, players, io, sockectId, room) {
        players.forEach(player => {
            this.emitRoomDataForPlayer(event, io, sockectId, room)
        })
    }
}
