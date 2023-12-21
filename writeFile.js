/**
 * Run the code using: 
 * node writeFile.js
 * 
 */

import * as fs from 'fs';

const obj = {name: 'Intelliswift'};

fs.writeFile('./sampleOutput.json', JSON.stringify(obj), err => {
  if (err) {
    console.error(err);
  }
});

fs.read('./sampleOutput.json', 'utf8', (err, data) => {
  console.log(data);
})