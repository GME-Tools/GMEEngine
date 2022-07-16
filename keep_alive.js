var http = require('http');

const port = 8080;

http.createServer(function (req, res) {
  res.write("[Keep alive] Ecoute sur le port " + port);
  res.end();
}).listen(port);