'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var router = express.Router();
var pets = require('./pets.json')

app.disable('x-powered-by');

router.get('/pets', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(pets);
});

router.get('/pets/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

 if(index < 0 || index > pets.length-1){
  res.set('Content-Type', 'text/plain');
  res.status(404);
  res.send('Not Found');
  }
  else {
    res.set('Content-Type', 'application/json');
    res.send(pets[index]);
  }
});

app.use(router);
// app.use(function(req, res) {
//   res.sendStatus(404);
// });

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
