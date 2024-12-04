const authenticateToken = require('../middleware/authenticateToken');
const router = require('express').Router();
const getCards = require('../public/cardCRUD');

router.get('/cards', authenticateToken, getCards);


router.post('/cards', authenticateToken, (req, res) => {
    res.send(`Hello ${req.user.name}, this is a protected route!`);    
});


router.put('/cards', authenticateToken, (req, res) => {
    res.send(`Hello ${req.user.name}, this is a protected route!`);    
});


router.delete('/cards', authenticateToken, (req, res) => {
    res.send(`Hello ${req.user.name}, this is a protected route!`);    
});


module.exports = router