const authenticateToken = require('../middleware/authenticateToken');
const router = require('express').Router();

const { getCards, createCard, updateCard, deleteCard } = require('../public/cardCRUD');

router.get('/cards/', authenticateToken, getCards);
router.post('/cards/', authenticateToken, createCard);
router.put('/cards/:id', authenticateToken, updateCard);
router.delete('/cards/:id', authenticateToken, deleteCard);


module.exports = router