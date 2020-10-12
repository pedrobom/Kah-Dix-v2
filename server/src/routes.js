const express = require("express");
const fs = require('fs')
const Utils = require('./lib/utils')

const routes = express.Router();

//
// Métodos helpers
//

// Esté método basicamente serve o index.html com a adição das informações de open graph
// (isso são informacoes para compartilhamento de link em plataformas como discord, etc)

// Mais detalhes aqui: https://ogp.me/
const serveIndexWithOpenGraph = function (req, res) {

  let contents = fs.readFileSync('../client/build/index.html').toString()

  // Mais detalhes aqui: https://ogp.me/
  // Com esse esquema de "opengraph", plataformas como discord e facebook conseguem
  // dar mais informacoes para o usuário quando nosso link é compartilhado :)
  let roomName =  Utils.escapeHTML(req.params.roomName)

  var opengraphUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var opengraphImage = req.protocol + '://' + req.get('host') + '/opengraph-image.png';
  var opengraphTitle = roomName ? `Jonarius - Vem jogar na sala: ${roomName} :)` : `Jonarius - Vem jogar com a gente :)`
  var opengraphDescription = 'Jonarius é uma alternativa online ao jogo Dixit.. vem experimentar!'

  let opengraphData = `
  <meta property="og:title" content="${opengraphTitle}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${opengraphUrl}" />
<meta property="og:image" content="${opengraphImage}" />
<meta property="og:description" content="${opengraphDescription}" />
  `;

  contents = contents.replace("<opengraph/>", opengraphData)
  res.send(contents)
}


//
// Rotas
//


routes.get("/healthcheck", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

// Vamos renderizar o / com script e não estático, para poder
// mandar parametros de opengraph :)
routes.get("/", serveIndexWithOpenGraph)
routes.get("/GameRoom/:roomName", serveIndexWithOpenGraph)

// Com menos prioridade que os paths customizados, servir arquivos estáticos :)
routes.use(express.static('../client/build'))

// E servir o arquivo index.html em caso de 404,
// que deve saber lidar com isso no frontend
routes.use(serveIndexWithOpenGraph)

module.exports = routes;


