import express, { Application } from 'express'
import http, { Server } from 'http'
import socketio from 'socket.io'
import routes from './routes'

import dotenv from 'dotenv'
dotenv.config()
const testPort = process.env.TEST_PORT || 9000

const SocketEmitter = require('./SocketEmitter')

const RoomController = require('./POSTGRESQL/controllers/RoomController')
const UserController = require('./POSTGRESQL/controllers/UserController')
const SocketController = require('./POSTGRESQL/controllers/SocketController')

interface IData {
    name?:string
    roomName?:string
    socketId?:string
}

require('./POSTGRESQL/database/index')

const app:Application = express();
const server:Server = http.createServer(app)
const io: SocketIO.Server = socketio(server);

app.use(express.json())
app.use(routes)

io.on('connection', async (socket:any):Promise<void> => {
    console.log('A user has connected with socket id: [%s]', socket.id)
    const socketData:IData = {socketId: socket.id}

    await SocketController.createSocketRow(socketData)
    const user = await UserController.createUser(socketData)
    
    socket.on('join', async (data:IData):Promise<void> => {
        console.log("\nUser [%s] trying to JOIN with name [%s] on room [%s]", 
            socket.id, 
            data.name, 
            data.roomName
        )

        await UserController.nameUser({name: data.name, socketId: socket.id})
        const room = await RoomController.init({roomName: data.roomName, socketId: socket.id})
        
        const players = await RoomController.getPlayersInRoom({roomName: data.roomName})

        SocketEmitter.emitDataForAll('roomData', players, io, {user, room})
    })

    // GAME STATES \\
    socket.on('changeDeck', () => {    
    })
    socket.on('victoryChange', () => {
    })
    socket.on('selectPeqDeck', () => {
    })
    socket.on('selectEuroDeck', () => {
    })
    socket.on('gameStart', () => {
    })
    socket.on('selectCard', () => {
    })
    socket.on('voteCard', () => {
    })
    // GAME STATES \\


    socket.on('sendMessage', async (message:string) => {
        const userRoom = await RoomController.getRoomOfUser(user)
        SocketEmitter.emitData('message', io, userRoom["roomName"], {
            user: user["name"],
            userId: user["id"],
            text: message,
            systemMessage: false,
            date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        })
    })
    socket.on('disconnect', ():void => {
        console.log("A user has disconnected...")

        // FAZER A LIMPEZA DOS SOCKETS NO DATABASE ---> precisa deixar o cookie!
    })
})

server.listen(testPort, () => {

    console.log(`
    ██████████████████████████████╗
    ╚══██╔══██╔════██╔════╚══██╔══╝
       ██║  █████╗ ███████╗  ██║   
       ██║  ██╔══╝ ╚════██║  ██║   
       ██║  ██████████████║  ██║   
       ╚═╝  ╚══════╚══════╝  ╚═╝
       ██████╗██╗   █████╗   █████╗   ███████████████╗ 
       ██╔══████║   ██████╗  ██████╗  ████╔════██╔══██╗
       ██████╔██║   ████╔██╗ ████╔██╗ ███████╗ ██████╔╝
       ██╔══████║   ████║╚██╗████║╚██╗████╔══╝ ██╔══██╗
       ██║  ██╚██████╔██║ ╚██████║ ╚█████████████║  ██║
       ╚═╝  ╚═╝╚═════╝╚═╝  ╚═══╚═╝  ╚═══╚══════╚═╝  ╚═╝ \n`)

       console.log('      ######### Server running on port: [%s] #########\n', testPort)
})