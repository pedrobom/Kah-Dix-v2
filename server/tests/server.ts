import express, { Application } from 'express'
import http, { Server } from 'http'
import socketio from 'socket.io'
import routes from './routes'

import dotenv from 'dotenv'
dotenv.config()
const testPort = process.env.TEST_PORT || 9000

const RoomController = require('./POSTGRESQL/controllers/RoomController')
const UserController = require('./POSTGRESQL/controllers/UserController')
const SocketController = require('./POSTGRESQL/controllers/SocketController')

interface IData {
    name:string
    roomName:string
}

require('./POSTGRESQL/database/index')

const app:Application = express();
const server:Server = http.createServer(app)
const io: SocketIO.Server = socketio(server);

app.use(express.json())
app.use(routes)

io.on('connection', async (socket:any):Promise<void> => {
    console.log('A user has connected with socket id: [%s]', socket.id)

    await SocketController.createSocketRow({socketId: socket.id})
    
    socket.on('join', async (data:IData):Promise<void> => {
        console.log("\nUser [%s] trying to JOIN with name [%s] on room [%s]", 
            socket.id, 
            data.name, 
            data.roomName
        )
        
        await UserController.createUser({name: data.name, socketId: socket.id})
        await RoomController.init({roomName: data.roomName, socketId: socket.id})

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