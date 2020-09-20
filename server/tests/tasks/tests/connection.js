const io = require('socket.io-client')

const socketA = io.connect("http://localhost:9000/")

// const emitSocketA = (event, data) => {
//     console.log('Initializing connection for socketA')

//     return new Promise((resolve, reject) => {

//         socketA.emit(event, data => {
//             try {
//                 resolve(data)
//             } catch (ex) {
//                 reject(ex.message)
//             }
//         })

//     })
// }

function pipelineTest() {
    socketA.emit('join', { name: "Socket A", roomName: "Sala 1" })
}

module.exports = cb => {
    pipelineTest()
    return cb()
}

// module.exports = async (cb) => {
//     pipelineTest().then(() => {
//         return cb()
//     })
// }
