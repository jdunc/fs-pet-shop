

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const pets = require('./pets3.json');

app.disable('x-powered-by');
app.use(bodyParser.json());
// app.use(morgan);
router.get('/pets', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send(pets);
});

router.get('/pets/:index', (req, res) => {
  const index = Number.parseInt(req.params.index);

  if (index < 0 || index > pets.length - 1) {
    res.set('Content-Type', 'text/plain');
    res.status(404);
    res.send('Not Found');
  } else {
    res.set('Content-Type', 'application/json');
    res.send(pets[index]);
  }
});

router.post('/pets', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const kind = req.body.kind;
  // console.log(`POST request received! name:${name} age:${age} kind:${kind}`);
  // console.log(`req: ${req[0]}`);
  if (name !== '' && kind !== '' && !isNaN(Number(age))) {
    const pet = {
      age,
      kind,
      name,
    };
    pets.push(pet);
    fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
      if (err) {
        return console.log(err);
      }
    });
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.send(pet);
  } else {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Bad Request');
  }
}); // end post request

router.put('/pets/:index', (req, res) => {
  const index = Number.parseInt(req.params.index);
  const name = req.body.name;
  const age = req.body.age;
  const kind = req.body.kind;
  if (name !== '' && kind !== '' && !isNaN(Number(age))) {
    const pet = {
      age,
      kind,
      name,
    };
    pets[index] = pet;
    fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
      if (err) {
        return console.log(err);
      }
    });
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.send(pet);
  } else {
    res.status(400);
    res.set('Content-Type', 'text/plain');
    res.send('Bad Request');
  }
}); // end of put request

router.delete('/pets/:index', (req, res) => {
  const index = Number.parseInt(req.params.index);

  if (index < 0 || index > pets.length - 1) {
    res.set('Content-Type', 'text/plain');
    res.status(404);
    res.send('Not Found');
  } else {
    res.set('Content-Type', 'application/json');
    // console.log(pets);
    const pet = pets.splice(index, 1)[0];
    // console.log(pet);
    // console.log(pets);

    res.send(pet);
  }
}); // end of delete request

app.use(router);
// app.use(function(req, res) {
//   res.sendStatus(404);
// });

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
