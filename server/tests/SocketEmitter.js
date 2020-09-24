module.exports = class SocketEmitter {
    static emitData(event, io, destination, data) {
        io.to(destination).emit(event, data)
    }

    static emitDataForAll(event, players, io, data) {
        players.forEach(player => {
            SocketEmitter.emitDataForPlayer(event, io, player["socketId"], data)
        })
    }
}
