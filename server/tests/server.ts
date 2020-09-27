import express, { Application } from 'express'
import http, { Server } from 'http'
import socketio from 'socket.io'
import routes from './routes'

require('dotenv').config()

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
interface IGameConditions {
    isDeckDixit:boolean
    isDeckEuro:boolean
    isDeckNude:boolean
    isDeckPeq:boolean
    victoryCondition?:string
}

require('./POSTGRESQL/database/index')

const app:Application = express();
const server:Server = http.createServer(app)
const io: SocketIO.Server = socketio(server);

app.use(express.json())
app.use(routes)


io.on('connection', async (socket:any):Promise<void> => {

    console.log('A user has connected with socket id: [%s]', socket.id)
    const socketObject = await SocketController.createSocketAsync(socket.id)
    const user = await UserController.createUserAsync(socketObject)
    
    socket.on('join', async (data:IData):Promise<void> => {
        console.log("\nUser [%s] trying to JOIN with name [%s] on room [%s]", 
            socket.id, 
            data.name, 
            data.roomName
        )

        await UserController.nameUserAsync(user, data.name)
        await RoomController.initAsync(data.roomName, user, socket.id)        
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        
        // const socketsArray = await RoomController.getSocketsOfRoom(userRoom)

        // const roomData = await RoomController.getRoomDataAsync('ROOM DATA')
        // SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData)
    })


    // GAME STATES \\
    socket.on('changeDeck', async (decks:IGameConditions):Promise<void> => { 
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)
        await RoomController.setDeckAsync(decks)

        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')
        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData)  
    })

    socket.on('victoryChange', async (victoryCondition:string):Promise<void> => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)
        await RoomController.setVictoryAsync(victoryCondition)

        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')
        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData) 
    })

    socket.on('selectPeqDeck', async (newBool:boolean):Promise<void> => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)
        await RoomController.selectPeqDeck(newBool)

        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')
        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData) 
    })

    socket.on('selectEuroDeck', async (newBool:boolean):Promise<void> => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)
        await RoomController.selectEuroDeck(newBool)
        
        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')
        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData) 
    })

    socket.on('gameStart', async ():Promise<void> => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const roomPlayers = userRoom.players
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)

        await RoomController.startGameAsync('START GAME!!!')

        SocketEmitter.emitData('message', io, userRoom.roomName, {
            user: user["name"],
            userId: user["id"],
            text: 'Tá valendo! A partida começou!',
            systemMessage: true,
            date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        })

        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')
        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData)  

        SocketEmitter.emitData('message', io, userRoom.roomName, {
            user: user["name"],
            userId: user["id"],
            text: `${roomPlayers[userRoom.currentPlayerIndex].name} tá matutando a epígrafe!`,
            systemMessage: true,
            date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        })


    })
    socket.on('pickPrompt', async (prompt:string):Promise<void> => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)
        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')

        await RoomController.setPromptForUserAsync(prompt)

        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData) 
        
        SocketEmitter.emitData('message', io, userRoom.roomName, {
            user: user["name"],
            userId: user["id"],
            text: 'Já podem escolher a cartinha!',
            systemMessage: true,
            date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        })
    })

    socket.on('selectCard', async (card:string):Promise<void> => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)
        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')

        await RoomController.setSelectedCardForUserAsync(card)

        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData) 

    })

    socket.on('voteCard', async (card:string):Promise<void> => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        const socketsArray = await RoomController.getSocketsOfRoom(userRoom)
        const roomData = await RoomController.getRoomDataAsync('ROOM DATA')

        await RoomController.setVotedCardForUserAsync(card)

        SocketEmitter.emitDataForAll('roomData', socketsArray, io, roomData) 
    })
    // GAME STATES \\

    

    socket.on('sendMessage', async (message:string) => {
        const userRoom = await RoomController.getRoomOfUserAsync(user)
        console.info("Sending system message [%s] to room [%s]", message, userRoom.roomName)
        
        SocketEmitter.emitData('message', io, userRoom.roomName, {
            user: user["name"],
            userId: user["id"],
            text: message,
            systemMessage: false,
            date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        })
    })

    socket.on('quitRoom', async ():Promise<void> => {
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