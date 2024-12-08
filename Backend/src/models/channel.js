const mongoose = require('mongoose')
const Joi = require('joi')


const channelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    creator: {
        type: String,
        ref: 'User',
        required: true,
    }

})


function validateChannel(user) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(20).required(),
        creator: Joi.string().required(),
    })
    return schema.validate(user)
}


const Channel = mongoose.model('Channel', channelSchema)
module.exports.validate = validateChannel
module.exports = Channel;