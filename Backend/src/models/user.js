const mongoose = require('mongoose')
const Joi = require('joi')


const userSchema = new mongoose.Schema({
    customId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100

    },
    backgroundColor: {
        type: String
    },
    token: {
        type: String,
        unique: true
    }
})


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(5).max(100).required(),
    })
    return schema.validate(user)
}


const User = mongoose.model('User', userSchema)
module.exports.validate = validateUser
module.exports.User = User