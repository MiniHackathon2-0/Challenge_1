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
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100

    },
    backgoundColor: {
        type: String
    },
    token: {
        type: String
    }
})


function validateUser(user) {
    const schema = Joi.object({
        customId: Joi.string(),
        name: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(5).max(100).required(),
        backgoundColor: Joi.string(),
        token: Joi.string(),
    })
    return schema.validate(user)
}


const User = mongoose.model('User', userSchema)
module.exports.validate = validateUser
module.exports.User = User