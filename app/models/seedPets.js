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

mongoose.connect(db, {
    useNewUrlParser: true
}) 
    .then(() => {
        Pet.deleteMany({ owner:null})
            .then(deletedPets => {
                console.log('the deleted pets', deletedPets)
                Pet.create(startPets)
                    .then(newPets => {
                        console.log('new pets added to db', newPets)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log('an error occured', error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log('an error occured: \n', error)
                mongoose.connect.close()
            })
    })
    .catch(error => {
        console.log('an error occured: \n', error)
        mongoose.connect.close()
    })