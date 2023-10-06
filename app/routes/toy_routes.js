
const express = require('express')
const passport = require('passport')
const Pet = require('../models/pet')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const toySchema = require('../models/toy')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


// create a toy

router.post('/toys/:petId', removeBlanks, (req, res, next) => {
    //save to from req.body to a variable
    const toy = req.body.toy
    ///isolate the pet id for ease of use
    const petId = req.params.petId

    ///find the pet
    Pet.findById(petId)
    ///make sure we have a pet
    .then(handle404)
    //push the new toy into the pets array
    ///save the pet
    .then(pet => {
        pet.toys.push(toy)
        return pet.save()
    })

    .then(pet => res.status(201).json({pet:pet}))
    ///handle errors
    .catch(next)    

})

//PATCH update a toy
router.patch('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res, next) => {
    ///save both ids to variables to use later
    const petId = req.params.petId 
    const toyId = req.params.toyId
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            const theToy = pet.toys.id(toyId)
            requireOwnership(req, pet)

            theToy.set(req.body.toy)

            return pet.save()

        })

        .then(() => res.sendStatus(204))
        .catch(next)

})

//delete a toy
router.delete('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res, next) => {
    ///save both ids to variables to use later
    const petId = req.params.petId 
    const toyId = req.params.toyId
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            const theToy = pet.toys.id(toyId)
            requireOwnership(req, pet)

            theToy.deleteOne()

            return pet.save()

        })

        .then(() => res.sendStatus(204))
        .catch(next)

})



module.exports = router