const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
// const routes = require('./routes');
const fs = require('fs')

const app = express();
const server = http.createServer(app)
const io = socketio(server);

//
// MIDDLEWARES
//

//
// Implementação de sessões no socket e no servidor express :)
//
const sessionMiddleware = require("express-session")({
  secret: "agentequerboleteyesok123",
  resave: true,
  saveUninitialized: true,
  cookie: {
    // Cookie expira em um mes :), em millisegundos
    maxAge: 30 * 24 * 60 * 60 * 1000,
  }

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

// Colocando middleware para parsear o body em objeto e o query string também
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.send("<h1>Hello from Docker!!!</h1>")
})

//
// ROTEAMENTO
//

// Roteamento de coisas com lógica customizada
// app.use(routes)

module.exports = { io, server, app }