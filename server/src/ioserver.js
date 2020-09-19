const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');

const app = express();
const server = http.createServer(app)
const io = socketio(server);

//
// Implementação de sessões no socket e no servidor express :)
//
const sessionMiddleware = require("express-session")({
    secret: "agentequerboleteyesok123",
    resave: true,
    saveUninitialized: true
  })

// Gambiarra para colocar cookie de sessão no socketio
// --------
// Isso intercepta cada request e faz a sessão antes do express e do socketIO terem
// a chance de fazer qualquer coisa :)
var listeners = server.listeners('request').slice(0);
server.removeAllListeners('request');
server.on('request', (req, res) => {
  sessionMiddleware(req, res, () => {
    listeners.forEach((listener) => {
      listener.call(this, req, res)
    })
  })
})
// Debugging cookies that are sent :)
// var oldWriteHead = http.ServerResponse.prototype.writeHead
// http.ServerResponse.prototype.writeHead = function() {
//   console.log("WRITING HEAD!", this.getHeader('Set-Cookie'))
//   console.log("WRITING HEAD!", arguments)
//   oldWriteHead.apply(this, arguments)
// }

// Outros modulos do servidor
app.use(cors());
app.use(router)

module.exports = {io, server, app}

