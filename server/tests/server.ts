import express, { Application } from 'express'
import http, { Server } from 'http'
import socketio from 'socket.io'
import routes from './routes'

import dotenv from 'dotenv'
dotenv.config()
const testPort = process.env.TEST_PORT

const Subject = require('./POSTGRESQL/db_interface/Subject')
const requestObserver = require('./POSTGRESQL/db_interface/requestObserver')
const baseUrl = `http://localhost:${process.env.testPort}`

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
    
    socket.on('join', (data:IData):void =>{
        console.log("Usuário [%s] tentando entrar com nome [%s] na sala com nome [%s]", socket.id, data.name, data.roomName)
        Subject.subscribe(() => requestObserver(`${baseUrl}/rooms`, 'POST', {host: socket.id, roomName: data.roomName}))
        Subject.trigger()
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