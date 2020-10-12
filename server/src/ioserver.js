const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
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
  // cookie: {
  //   SameSite: 'none',
  //   secure: true,
  // }

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

//
// ROTEAMENTO
//

// Roteamento de coisas com lógica customizada
app.use(routes)


// E para finalizar, com menos prioridade de todos, servir arquivos estáticos :)
app.use(express.static('../client/build'))

// E servir o arquivo index.html em caso de 404,
// que deve saber lidar com isso no frontend
app.use(function(req, res) {
  res.send(fs.readFileSync('../client/build/index.html').toString())
})

module.exports = { io, server, app }

