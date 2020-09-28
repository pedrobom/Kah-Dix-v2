module.exports = class SocketEmitter {
    static emitData(event, io, destination, data) {
        io.to(destination).emit(event, data)
    }

    static emitDataForAll(event, socketArray, io, data) {
        socketArray.forEach(socket => {
            SocketEmitter.emitData(event, io, socket["socketId"], data)
        })
    }
}
