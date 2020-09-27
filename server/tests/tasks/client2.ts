import io from 'socket.io-client'
import dotenv from 'dotenv'
dotenv.config()

const testPort = process.env.TEST_PORT || 9000

const socketA:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)
const socketB:SocketIOClient.Socket = io.connect(`http://localhost:${testPort}/`)


const socketsArray = [
    {socket: socketA, isCoupled: true}, 
    {socket: socketB, isCoupled: true} 
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
                resolve(`socketA emit event ${event}!\n`)
            }, latency);
        } catch {
            reject('Something went wrong on connecting socketA\n')
        }
    })
}

const socketAListens = (event:string):void => {
    socketA.on(event, (data:any):void => {
        console.debug('SOCKET A RECEIVING DATA FROM SERVER:')
        console.debug(data)
    })
         
}

const socketBEmits = (event:string, data:IData, latency:number):Promise<string> => {
    console.log('Initializing connection for socketB:\n---> waiting %s ms', latency)

    return new Promise((resolve, reject) => {
        try{
            setTimeout(() => {
                socketB.emit(event, data)
                resolve(`socketB emit event ${event}!\n`)
            }, latency);
        } catch {
            reject('Something went wrong on connecting socketB\n')
        }
    })
}

const socketBListens = (event:string):void => {
    socketB.on(event, (data:any):void => {
        console.debug('SOCKET B RECEIVING DATA FROM SERVER:')
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
    const dataA:IData = {name: "Socket Bombabdo", roomName: "Sala DO PIPO"}
    const dataB:IData = {name: "Socket Maratonado", roomName: "Sala DO PIPÃO"}

    await socketAEmits('join', dataA, 3000)
        .then(console.log)
        .catch(console.log)
    
    await socketBEmits('join', dataB, 3000)
    .then(console.log)
    .catch(console.log)
    
    
    await disconnectAllCoupledSockets()
    .then(console.log)
    .catch(console.log)
}
    
// pipeline()

socketA.on('connect', ():void => {
    pipeline()
})

socketAListens('roomData')
socketBListens('roomData')