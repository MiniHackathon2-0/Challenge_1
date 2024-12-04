const mongoose = require('mongoose');
const Card = require('../models/card');

async function getCards(req, res){
    try{
        checkCreatorID(req, res);

        const cards = await Card.find();
        res.status(200).send(cards);
    } catch (err){
        console.error('Error fetching cards:', err);
        res.status(400).send(err);
    }
};


async function createCard(req, res){
    try{
        checkCreatorID(req, res);
        console.log('req.body: ', req.body);
        
        const card = await Card.create(req.body);
        res.status(200).send(card);
    } catch (err){
        console.error('Error creating card:', err);
        res.status(400).send(err);
    }
};


async function updateCard(req, res){
    try{
        checkCreatorID(req, res);
        const cardId = req.params.id;
        const updatedCard = await Card.findByIdAndUpdate(
            cardId,          // id der karte
            { $set: req.body }, // nur die übergebenen felder aktualisieren
            { new: true }     // rückgabe der aktualisierten karte
        );

        if (!updatedCard) {
            return res.status(404).send({ message: 'Card not found' });
        }
        res.status(200).send(updatedCard);
    } catch (err){
        console.error('Error updating card:', err);
        res.status(400).send(err);
    }
};


async function deleteCard(req, res){
    try{
        checkCreatorID(req, res);
        const cardId = req.params.id;
        console.log('cardId: ', cardId);
        
        const card = await Card.deleteOne({ _id: cardId });
        res.status(200).send({ message: 'Card deleted successfully' });
    } catch (err){
        console.error('Error deleting card:', err);
        res.status(400).send(err);
    }
};


function checkCreatorID(req, res){
    if (!mongoose.Types.ObjectId.isValid(req.body.creator)) {
        return res.status(400).send({ error: 'Invalid creator ID' });
    }
}


module.exports = {
    getCards,
    createCard,
    updateCard,
    deleteCard
};