const mongoose = require('mongoose')
const Joi = require('joi')


const cardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    answer: {
        type: String,
        required: true,
        max: 1000,
    },
    creator: {
        type: String,
        required: true,
    },
    color: {
        type: String
    },
    date: {
        type: Number,
        unique: false
    },
    posY: {
        type: String,
        unique: true
    },
    posX: {
        type: String,
        unique: true
    },
    category: {
        type: String,
        required: true,
    },
    flip:{
        type: Boolean,
        default: false

    }
})


function validateCard(user) {
    const schema = Joi.object({
        question: Joi.string().min(3).max(100).required(),
        answer: Joi.string().max(1000).required(),
        creator: Joi.string().min(5).max(100),
        color: Joi.string(),
        date: Joi.number(),
        posY: Joi.string(),
        posX: Joi.string(),
        category: Joi.string().required(),
        flip: Joi.boolean(),
        
    })
    return schema.validate(user)
}


const Card = mongoose.model('Card', cardSchema)
module.exports.validate = validateCard
module.exports = Card;