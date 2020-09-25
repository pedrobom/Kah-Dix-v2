import io from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

const testPort = process.env.TEST_PORT || 9000

const socketSemNome:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)


const disconnectSocketSemNome = ():Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // force socket to disconnect after 5 seconds!
            setTimeout(()=> {
                socketSemNome.disconnect()
                resolve('Socket Sem Nome hava been Disconnected!')
            }, 5000)
        } catch {
            reject('Something went wrong on disconnecting sockets')
        }
    })
}


async function pipeline(){
    await disconnectSocketSemNome()
        .then(console.log)
        .catch(console.log)
}

pipeline()