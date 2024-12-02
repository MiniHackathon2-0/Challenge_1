const mongoose = require('mongoose')
const Joi = require('joi')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 100

    },
    backgoundColor: {
        type: String
    }
})


function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(100).required(),
        backgoundColor: Joi.string().default(generateRandomColor())
    })
    return schema.validate(user)
}


const User = mongoose.model('User', userSchema)
module.exports.validate = validateUser
module.exports.User = User