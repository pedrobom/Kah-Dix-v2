import openSocket from 'socket.io-client'

export const socket = openSocket("http://localhost:5000");
socket.on('sessionData', (sessionData) => {
    console.log("Dados de sessão atualizados!", sessionData)
})