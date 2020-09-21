import io from 'socket.io-client'

const socketA:SocketIOClient.Socket = io.connect("http://localhost:9000/")

interface IData {
    name:string
    roomName:string
}


const connectionTaskSocketA = (event:string, data:IData):Promise<string> => {
    console.log('Initializing connection for socketA')

    return new Promise((resolve, reject) => {
        try{
            socketA.emit(event, data)
            resolve(`Socket emit event ${event}!`)
        } catch {
            reject('Something went wrong on connecting socketA')
        }
    })
}

const socketADisconnect = ():Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            // force socket to disconnect after 4 seconds!
            setTimeout(()=> {
                socketA.disconnect()
                resolve('Socket A disconnescted!')
            }, 4000)
        } catch {
            reject('Somethig went wrong on disconnection Socket A')
        }
    })
}

async function pipeline(){
    const data:IData = {name: "Socket A", roomName: "Room A"}

    await connectionTaskSocketA('join', data)
        .then(console.log)
        .catch(console.log)
    
    await socketADisconnect()
        .then(console.log)
        .catch(console.log)
}

export default pipeline