'use strict';
var http = require('http');
var port = process.env.PORT || 8000;
var pets = require('./pets2.json')

// app.disable('x-powered-by');

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/pets') {
    var petsJSON = JSON.stringify(pets);
    res.setHeader('Content-Type', 'application/json');
    res.end(petsJSON);
  }
  else if (req.method === 'GET' && req.url === '/pets/0') {
    var petsJSON = JSON.stringify(pets[0]);
    res.setHeader('Content-Type', 'application/json');
    res.end(petsJSON);
  } else if (req.method === 'GET' && req.url === '/pets/1') {
    var petsJSON = JSON.stringify(pets[1]);
    res.setHeader('Content-Type', 'application/json');
    res.end(petsJSON);
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});
//
// router.get('/pets', function(req, res) {
//   res.set('Content-Type', 'application/json');
//   res.send(pets);
// });
//
// router.get('/pets/:index', function(req, res) {
//   var index = Number.parseInt(req.params.index);
//
//  if(index < 0 || index > pets.length-1){
//   res.set('Content-Type', 'text/plain');
//   res.status(404);
//   res.send('Not Found');
//   }
//   else {
//     res.set('Content-Type', 'application/json');
//     res.send(pets[index]);
//   }
// });

// app.use(function(req, res) {
//   res.sendStatus(404);
// });

server.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = server;
