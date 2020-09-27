// Esté é um script de testes.. só conecta no socket e manda comandos manualmente :)
const io = require('socket.io-client');

console.log("Conectando :)")
const socketA = io.connect("http://localhost:5000/")
const socketB= io.connect("http://localhost:5000/")
const socketC= io.connect("http://localhost:5000/")

const emitSocketA = (event, data) => { 
    const promise = new Promise((resolve, reject) => {
        console.log('socketA: %s %s', event, JSON.stringify(data))
        socketA.emit(event, data, (error, response) => {
            console.log('Resultado: %s\n', (error, response, data) )
            resolve()
        })
    })
    return promise
}

const emitSocketB = (event, data) => { 
    const promise = new Promise((resolve, reject) => {
        console.log('socketB: %s %s', event, JSON.stringify(data))
        socketB.emit(event, data, (error, response) => {
            console.log('Resultado: %s\n', (error, response, data) )
            resolve()
        })
    })
    return promise
}

const emitSocketC = (event, data) => { 
    const promise = new Promise((resolve, reject) => {
        console.log('socketC: %s %s', event, JSON.stringify(data))
        socketC.emit(event, data, (error, response) => {
            console.log('Resultado: %s\n', (error, response, data) )
            resolve()
        })
    })
    return promise
}

async function pipelineTest(){
    // await emitSocketA('join', {})
    // await emitSocketA('join', {name: "A", roomName: "Sala"})
    // await emitSocketA('join', {name: "Teste", roomName: "Sa"})

    // await emitSocketB('join', {})
    await emitSocketA('join', {name: "Socket A", roomName: "Sala"})
    await emitSocketB('join', {name: "Socket B", roomName: "Sala"})
    await emitSocketC('join', {name: "Socket C", roomName: "Sala"})
    await emitSocketA('gameStart')
    await emitSocketA('pickPrompt', )
    
}

socketB.on('roomData', (data)=>{
    console.log('socketB recebeu roomData: ', data)
})
socketA.on('roomData', (data)=>{
    console.log('socketA recebeu roomData: ', data)
})
socketC.on('roomData', (data)=>{
    console.log('socketC recebeu roomData: ', data)
})
pipelineTest()

