const fs = require('fs');
const pets = require('./pets.json');

if (!process.argv[2]) {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
} else if (process.argv[2] === 'read') {
  if (!process.argv[3]) {
    console.log(pets);
  } else if (pets[process.argv[3]] !== undefined) {
    console.log(pets[process.argv[3]]);
  } else {
    console.error('Usage: node pets.js [read | create | update | destroy]');
    process.exit(1);
  }
} else if (process.argv[2] === 'create') {
  if (process.argv.length !== 6) {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  } else {
    const pet = {
      age: parseInt(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5],
    };
    pets.push(pet);
    fs.writeFile('./pets.json', JSON.stringify(pets), (err) => {
      if (err) {
        return console.log(err);
      }
    });
    console.log(pet);
  }
}
