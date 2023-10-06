///import dependencied
const mongoose = require('mongoose')


///toy is a sub doc NOT A MODEL
///each toy will belong to one pet


const toySchema = new mongoose.Schema ({
    name: {
        type:String,
        requires: true
    },
    description: {
        type:String
    },
    isSqueaky : {
        type: Boolean,
        required: true,
        default: false
    },
    condition:{
        type:String,
        ///were going to use enum
        enum: ['new', 'used', 'disgusting'],
        default: 'new'
    }
}, { timestamps: true})

module.exports = toySchema
