import io from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

const testPort = process.env.TEST_PORT || 9000

const socketA:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)
const socketB:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)
const socketC:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)

interface IData {
    name:string
    roomName:string
}


const connectionTaskSocketA = (event:string, data:IData, latency:number):Promise<string> => {
    console.log('Initializing connection for socketA ---> waiting %s ms', latency)

    return new Promise((resolve, reject) => {
        try{
            setTimeout(() => {
                socketA.emit(event, data)
                resolve(`socketA emit event ${event}!`)
            }, latency);
        } catch {
            reject('Something went wrong on connecting socketA')
        }
    })
}

const connectionTaskSocketB = (event:string, data:IData, latency:number):Promise<string> => {
    console.log('Initializing connection for socketB ---> waiting %s ms', latency)

    return new Promise((resolve, reject) => {
        try{         
            setTimeout(()=> {
                socketB.emit(event, data)
                resolve(`socketB emit event ${event}!`)
            }, latency)
        } catch {
            reject('Something went wrong on connecting socketB')
        }
    })
}

const connectionTaskSocketC = (event:string, data:IData, latency:number):Promise<string> => {
    console.log('Initializing connection for socketB ---> waiting %s ms', latency)

    return new Promise((resolve, reject) => {
        try{         
            setTimeout(()=> {
                socketC.emit(event, data)
                resolve(`socketC emit event ${event}!`)
            }, latency)
        } catch {
            reject('Something went wrong on connecting socketC')
        }
    })
}

const disconnectAllSockets = ():Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // force socket to disconnect after 5 seconds!
            setTimeout(()=> {
                socketA.disconnect()
                socketB.disconnect()
                socketC.disconnect()
                resolve('All Socket Disconnected!')
            }, 5000)
        } catch {
            reject('Something went wrong on disconnecting sockets')
        }
    })
}


async function pipeline(){
    const dataA:IData = {name: "Socket A", roomName: "Sala Azul"}
    const dataB:IData = {name: "Socket B", roomName: "Sala Verde"}
    const dataC:IData = {name: "Socket C", roomName: "Sala Azul"}

    await connectionTaskSocketA('join', dataA, 3000)
        .then(console.log)
        .catch(console.log)

    await connectionTaskSocketB('join', dataB, 3000)
        .then(console.log)
        .catch(console.log)
    
    await connectionTaskSocketC('join', dataC, 3000)
        .then(console.log)
        .catch(console.log)
    
    await disconnectAllSockets()
        .then(console.log)
        .catch(console.log)
}

pipeline()