'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var pets = require('./pets3.json')

app.disable('x-powered-by');
app.use(bodyParser.json());
// app.use(morgan);
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

router.post('/pets', function(req, res){
  var name = req.body.name;
  var age = req.body.age;
  var kind = req.body.kind;
  // console.log(`POST request received! name:${name} age:${age} kind:${kind}`);
  // console.log(`req: ${req[0]}`);
  if(name !== '' && kind !== '' && !isNaN(Number(age))){
    var pet = {
      'age': age,
      'kind': kind,
      'name': name
    }
    pets.push(pet);
    fs.writeFile("./pets.json", JSON.stringify(pets), function(err) {
      if(err) {
          return console.log(err);
      }
    })
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.send(pet);
  } else{
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Bad Request');
  }

}); //end post request

router.put('/pets/:index', function(req, res){
  var index = Number.parseInt(req.params.index);
  var name = req.body.name;
  var age = req.body.age;
  var kind = req.body.kind;
  if(name !== '' && kind !== '' && !isNaN(Number(age))){
    var pet = {
      'age': age,
      'kind': kind,
      'name': name
    }
    pets[index] = pet;
    fs.writeFile("./pets.json", JSON.stringify(pets), function(err) {
      if(err) {
          return console.log(err);
      }
    })
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.send(pet);
  } else{
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Bad Request');
  }
}); //end of put request

app.use(router);
// app.use(function(req, res) {
//   res.sendStatus(404);
// });

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
