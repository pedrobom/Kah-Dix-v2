import io from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

const testPort = process.env.TEST_PORT || 9000

const socketA:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)
const socketB:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)
const socketC:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)
const socketD:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)

// Switch "coupled" for selecting witch actions should be applied to all sockets
// in a bundle:
const socketsArray = [
    {socket: socketA, isCoupled: true}, 
    {socket: socketB, isCoupled: true}, 
    {socket: socketC, isCoupled: true}, 
    {socket: socketD, isCoupled: true}
]


interface IData {
    name?:string
    roomName?:string
}


const connectionTaskSocketA = (event:string, data:IData, latency:number):Promise<string> => {
    console.log('Initializing connection for socketA:\n---> waiting %s ms', latency)

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
    console.log('Initializing connection for socketB:\n---> waiting %s ms', latency)

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
    console.log('Initializing connection for socketC:\n---> waiting %s ms', latency)

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

const connectionTaskSocketD = (event:string, data:IData, latency:number):Promise<string> => {
    console.log('Initializing connection for socketD:\n---> waiting %s ms', latency)

    return new Promise((resolve, reject) => {
        try{         
            setTimeout(()=> {
                socketD.emit(event, data)
                resolve(`socketD emit event ${event}!`)
            }, latency)
        } catch {
            reject('Something went wrong on connecting socketD')
        }
    })
}

const disconnectAllCoupledSockets = ():Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // force socket to disconnect after 5 seconds!
            setTimeout(()=> {
                socketsArray.forEach(socketObject => {
                    if(socketObject.isCoupled === true){
                        socketObject.socket.disconnect()
                    }
                })
                resolve('All Coupled Sockets hava been Disconnected!')
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
    // const dataD:IData = {name: "Socket D", roomName: "Sala Vermelha"}

    await connectionTaskSocketA('join', dataA, 3000)
        .then(console.log)
        .catch(console.log)

    await connectionTaskSocketB('join', dataB, 3000)
        .then(console.log)
        .catch(console.log)
    
    await connectionTaskSocketC('join', dataC, 3000)
        .then(console.log)
        .catch(console.log)
    
    // await connectionTaskSocketC('join', dataD, 3000)
    //     .then(console.log)
    //     .catch(console.log)
    
    await disconnectAllCoupledSockets()
        .then(console.log)
        .catch(console.log)
}

pipeline()