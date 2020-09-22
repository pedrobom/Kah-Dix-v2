import io from 'socket.io-client'

const socketA:SocketIOClient.Socket = io.connect("http://localhost:9000/")
const socketB:SocketIOClient.Socket = io.connect("http://localhost:9000/")

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

const disconnectAllSockets = ():Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // force socket to disconnect after 5 seconds!
            setTimeout(()=> {
                socketA.disconnect()
                socketB.disconnect()
                resolve('All Socket Disconnectes!')
            }, 5000)
        } catch {
            reject('Somethig went wrong on disconnecting sockets')
        }
    })
}


async function pipeline(){
    const dataA:IData = {name: "Socket A", roomName: "Sala Teste"}
    const dataB:IData = {name: "Socket B", roomName: "Sala Teste"}

    await connectionTaskSocketA('join', dataA, 3000)
        .then(console.log)
        .catch(console.log)

    await connectionTaskSocketB('join', dataB, 3000)
        .then(console.log)
        .catch(console.log)
    
    await disconnectAllSockets()
        .then(console.log)
        .catch(console.log)
}

pipeline()