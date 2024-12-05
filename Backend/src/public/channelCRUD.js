const mongoose = require('mongoose');
const Channel = require('../models/channel');


async function getChannels(req, res){
    try{
        const channel = await Channel.find();
        res.status(200).send(channel);
    } catch (err){
        console.error('Error fetching cards:', err);
        res.status(400).send(err);
    }
};


async function createChannel(req, res){
    try{
        const { creator, title, cards } = req.body;
        const cardsArray = cards || [];

        const creatorObjectId = new mongoose.Types.ObjectId(creator.id);

        const channel = await Channel.create({
            creator: creatorObjectId,
            title,
            cards: cardsArray
        });
        res.status(200).send(channel);
    } catch (err){
        console.error('Error creating card:', err);
        res.status(400).send(err);
    }
};


async function deleteChannel(req, res) {
    try {
        const channelId = req.params.id;
        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).send({ error: 'Channel not found' });
        }

        console.log('req.user:', req.user);
        console.log('req.user.customId:', req.user._id);
        console.log('channel.creator.toString():', channel.creator.customId);

        if (req.user.id !== channel.creator.toString()) {
            return res.status(400).send({ error: 'You are not the creator of this channel' });
        }

        await Channel.deleteOne({ _id: channelId });
        res.status(200).send({ message: 'Channel deleted successfully' });

    } catch (err) {
        console.error('Error deleting channel:', err);
        res.status(400).send(err);
    }
}



function checkCreatorID(req, res){
    if (!mongoose.Types.ObjectId.isValid(req.body.creator)) {
        return res.status(400).send({ error: 'Invalid creator ID' });
    }
}


module.exports = {
    getChannels,
    createChannel,
    deleteChannel
};