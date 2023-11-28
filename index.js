"use strict"
import { companies } from './data/data.js'
console.log('In index.js updated - testing again - removed small change');
document.getElementById('output').innerHTML = 'Number of companies: ' + companies.length;

console.log(companies.length);
function inputChanged(event) {
    document.getElementById('output').innerHTML = event.target.value;
}

function onSubmit(event) {
    event.preventDefault();
    console.log('Form Submitted');
}