///seed pets will run with command npm run seed
const  mongoose = require('mongoose')
const Pet = require('./pet')
const db = require('../../config/db')


const startPets = [
    {name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    {name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    {name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    {name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    {name: 'Sparky', type: 'dog', age: 2, adoptable: true}

]