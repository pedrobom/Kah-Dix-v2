const express = require("express");
const fs = require('fs')

const routes = express.Router();


routes.get("/healthcheck", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

// Vamos renderizar o / com script e não estático, para poder
// mandar parametros de opengraph :)
routes.get("/GameRoom/:roomName", (req, res) => {

  // Vamos jogar para home se nao houver sala :)
  if (!req.params.roomName) {
    return res.send(404)
  }

  let contents = fs.readFileSync('../client/build/index.html').toString()

  // Mais detalhes aqui: https://ogp.me/
  // Com esse esquema de "opengraph", plataformas como discord e facebook conseguem
  // dar mais informacoes para o usuário quando nosso link é compartilhado :)
  let roomName = req.params.roomName

  var opengraphUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var opengraphIcon = req.protocol + '://' + req.get('host') + '/favicon.ico';
  var opengraphTitle = roomName ? `Jonarius - Vem jogar na sala ${roomName} :)` : `Jonarius - Vem jogar com a gente :)`

  let opengraphData = `
  <meta property="og:title" content="${opengraphTitle}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${opengraphUrl}" />
<meta property="og:image" content="${opengraphIcon}" />
  `;

  contents = contents.replace("<opengraph/>", opengraphData)
  res.send(contents)
})


module.exports = routes;


