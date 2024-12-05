const mongoose = require('mongoose')
const Joi = require('joi')


const channelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 40,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        default: []
    }]
})


function validateChannel(user) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(40).required(),
        creator: Joi.object().required(),
        cards: Joi.object().optional(),
    })
    return schema.validate(user)
}


const Channel = mongoose.model('Channel', channelSchema)
module.exports.validate = validateChannel
module.exports = Channel;