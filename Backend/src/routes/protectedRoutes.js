const authenticateToken = require('../middleware/authenticateToken');
const router = require('express').Router();

router.get('/test', authenticateToken, (req, res) => {
    res.send(`Hello ${req.user.name}, this is a protected route!`);
});

module.exports = router