const mongoose = require('mongoose');
const Channel = require('../models/channel');
const Card = require('../models/card');

/**
 * 
 * get all channels
 * 
 * to delete the card
 */
async function getChannels(req, res) {
    try {
        const channel = await Channel.find();
        res.status(200).send(channel);
    } catch (err) {
        console.error('Error fetching cards:', err);
        res.status(400).send(err);
    }
};

/**
 * 
 * @param {body} object of channel to create 
    {
    "title": "Deutsch"
    }
 * @returns 
 */
async function createChannel(req, res) {
    try {
        const { title } = req.body;
        const cardsArray = [];

        const creatorCustomId = req.user.id;

        const channel = await Channel.create({
            creator: creatorCustomId,
            title,
            cards: cardsArray
        });

        res.status(200).send(channel);
    } catch (err) {
        console.error('Error creating channel:', err);
        res.status(400).send(err);
    }
}

/**
 * 
 * @param {params.id} id of channel 
 * 
 * to delete the channel
 */
async function deleteChannel(req, res) {
    try {
        const channelId = req.params.id;
        const channel = await Channel.findById(channelId);

        if (!channel) {
            return res.status(404).send('Channel not found');
        }

        if (req.user.id !== channel.creator) {
            return res.status(400).send('You are not the creator of this channel');
        }

        await Card.deleteMany({ category: channel.title });

        await Channel.deleteOne({ _id: channelId });
        res.status(200).send('Channel deleted successfully');

    } catch (err) {
        console.error('Error deleting channel:', err);
        res.status(400).send(err);
    }
}


module.exports = {
    getChannels,
    createChannel,
    deleteChannel
};