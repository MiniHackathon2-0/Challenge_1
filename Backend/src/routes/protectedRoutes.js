const authenticateToken = require('../middleware/authenticateToken');
const router = require('express').Router();

const { getCards, createCard, updateCard, deleteCard } = require('../public/cardCRUD');
const { getChannels, createChannel, deleteChannel } = require('../public/channelCRUD');

const cors = require('cors');
router.use(cors());

router.get('/cards/:category/', authenticateToken, getCards);
router.post('/cards/', authenticateToken, createCard);
router.put('/cards/:id/', authenticateToken, updateCard);
router.delete('/cards/:id/', authenticateToken, deleteCard);

router.get('/channel/', authenticateToken, getChannels);
router.post('/channel/', authenticateToken, createChannel);
router.delete('/channel/:id/', authenticateToken, deleteChannel);


module.exports = router