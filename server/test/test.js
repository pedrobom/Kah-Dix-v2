// Esté é um script de testes.. só conecta no socket e manda comandos manualmente :)
const io = require('socket.io-client');
const async = require('async');


console.log("Conectando :)")
const socketA = io.connect("http://localhost:5000/")
const socketB= io.connect("http://localhost:5000/")

const emitSocketA = (event, data) => { 
    const promise = new Promise((resolve, reject) => {
        socketA.emit(event, data, (a) => {
            console.log('Resultado: ', a)
            resolve()
        })
    })
    return promise
}

const emitSocketB = (event, data) => { 
    const promise = new Promise((resolve, reject) => {
        socketB.emit(event, data, (a) => {
            console.log('Resultado: ', a)
            resolve()
        })
    })
    return promise
}

async function pipelineTest(){
    await emitSocketA('join', {})
    await emitSocketA('join', {name: "A", roomName: "Sala"})
    await emitSocketA('join', {name: "Teste", roomName: "Sa"})

    await emitSocketB('join', {})
    await emitSocketB('join', {name: "A", roomName: "Sala"})
    await emitSocketB('join', {name: "Teste", roomName: "Sa"})
}

pipelineTest()

// async.series([
//     (done) => {
//         // Entrando na sala com dados inválidos!
//         console.log("Tentando entrar em uma sala sem nenhum dado..")
//         socketA.emit("join", {}, (a) => {
//             console.log("Resultado: ", a)
//             done()
//         })
//     },
//     (done) => {
//         // Entrando na sala com dados válidos :)
//         console.log("Tentando entrar em uma sala com dados válidos")
//         socketA.emit("join", {name: "A", roomName: "Sala"}, (a) => {
//             console.log("Resultado: ", a)
//             done()
//         })
//     },
//     (done) => {
//         // Tentando entrar na sala depois de já ter entrado em outra..
//         console.log("Tentando entrar em uma sala depois de já ter uma sala")
//         socketA.emit("join", {name: "Teste", roomName: "Sa"}, (a) => {
//             console.log("Resultado: ", a)        
//             done()
//         })
//     },
//     (done) => {
//         // Tentando entrar na slaa com o jogador B
//         console.log("Tentando entrar na sala com o jogador B")
//         socketB.emit("join", {name: "B", roomName: "Sala"}, (a) => {
//             console.log("Resultado: ", a)        
//             done()
//         })
//     },,
//     (done) => {
//         // Tentando começar a partida com o jogador A
//         console.log("Tentando começar a partida com o jogador A")
//         socketA.emit("gameStart", (a) => {
//             console.log("Resultado: ", a)        
//             done()
//         })
//     }

// ])


