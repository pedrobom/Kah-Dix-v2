module.exports = class SocketEmitter {
    static emitData(event, io, destination, data) {
        io.to(destination).emit(event, data)
    }

    static emitDataForAll(event, players, io, data) {
        players.forEach(player => {
            SocketEmitter.emitData(event, io, player["socketId"], data)
        })
    }
}
