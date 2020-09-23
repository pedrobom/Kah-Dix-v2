import io from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

const testPort = process.env.TEST_PORT || 9000

const socketA:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)

// Switch "coupled" for selecting witch actions should be applied to all sockets
// in a bundle:
const socketsArray = [
    {socket: socketA, isCoupled: true}, 
]


interface IData {
    name?:string
    roomName?:string
}


const socketAEmits = (event:string, data:IData, latency:number):Promise<string> => {
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

const socketAListens = (event:string):void => {
    socketA.on(event, (data:IData):void => {
        console.debug('DATA RECEIVED FROM SERVER:')
        console.debug(data)
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
    const dataA:IData = {name: "Socket A 2º Teste", roomName: "Sala Púrpura"}

    await socketAEmits('join', dataA, 3000)
        .then(console.log)
        .catch(console.log)

    socketAListens('roomData')

    await disconnectAllCoupledSockets()
        .then(console.log)
        .catch(console.log)
}

pipeline()