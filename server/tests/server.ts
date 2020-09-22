import express, { Application } from 'express'
import http, { Server } from 'http'
import socketio from 'socket.io'
import routes from './routes'

import dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config()
const testPort = process.env.TEST_PORT

const Subject = require('./observer_interface/Subject')
const RoomController = require('./POSTGRESQL/controllers/RoomController')
const UserController = require('./POSTGRESQL/controllers/UserController')

interface IData {
    name: string
    roomName:string
}

require('./POSTGRESQL/database/index')

const app:Application = express();
const server:Server = http.createServer(app)
const io: SocketIO.Server = socketio(server);

app.use(express.json())
app.use(routes)

io.on('connection', (socket:any):void => {
    console.log('A user has connected with socket id: [%s]', socket.id)

    
    socket.on('join', (data:IData):void => {
        console.log("User [%s] trying to JOIN with name [%s] on room [%s]", socket.id, data.name, data.roomName)
        
        new Promise( resolver => {
            resolver()
        })
            .then( () => UserController.createUser({ name: data.name,  socketId: `${socket.id}`}) )
            .then( () => RoomController.createRoom({roomName: data.roomName}) )
            .catch(console.log)
        

        
    })

    socket.on('disconnect', ():void => {
        console.log("A user has disconnected...")
    })
})

server.listen(testPort, () => {
    console.log('######################################')
    console.log('######## SERVER UP: PORT %s ########\n', testPort)
    console.log('THIS IS A SERVER FOR TESTS\nFeel free to Overdue stuff!')
    console.log('\n######################################')
    console.log('######################################\n')
})