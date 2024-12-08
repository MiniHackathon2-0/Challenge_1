const mongoose = require('mongoose');
const Card = require('../models/card');
const validateCard = require('../models/card');

/**
 * 
 * @param {params.category} the category of cards  
 * 
 */
async function getCards(req, res) {
    try {
        const { category } = req.params;
        const cards = await Card.find({ category });
        res.status(200).send(cards);
    } catch (err) {
        console.error('Error fetching cards:', err);
        res.status(400).send(err);
    }
};

/**
 * 
 * @param {body} object of card to create 
    {
        "question": "Wer war das?",
        "answer": " Ich",
        "color": "blue",
        "posY": 43,
        "posX": 34,
        "category": "Programmieren"
    }
 * @returns 
 */
async function createCard(req, res) {
    const { error } = validateCard(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    try {
        const card = {
            "question": req.body.question,
            "answer": req.body.answer,
            "creator": req.user.id,
            "color": req.body.color,
            "date": Date.now(),
            "posY": req.body.posY,
            "posX": req.body.posX,
            "category": req.body.category
        }
        const result = await Card.create(card);
        res.status(200).send(result);
    } catch (err) {
        console.error('Error creating card:', err);
        res.status(400).send(err);
    }
};

/**
 * 
 * @param {params.id} id of card 
 * @param {body} object of card to update 
    {
        "question": "Wer war das?",
        "answer": " Ich",
        "color": "blue",
        "posY": 43,
        "posX": 34,
        "category": "Programmieren"
    }
 * all of this obj is optional
 * @returns 
 */
async function updateCard(req, res) {
    try {
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
    } catch (err) {
        console.error('Error updating card:', err);
        res.status(400).send(err);
    }
};

/**
 * 
 * @param {params.id} id of card 
 * 
 * to delete the card
 */
async function deleteCard(req, res) {
    try {
        const cardId = req.params.id;

        await Card.deleteOne({ _id: cardId });
        res.status(200).send({ message: 'Card deleted successfully' });
    } catch (err) {
        console.error('Error deleting card:', err);
        res.status(400).send(err);
    }
};


module.exports = {
    getCards,
    createCard,
    updateCard,
    deleteCard
};