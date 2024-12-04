function getCards(req, res){
    res.send(`Hello ${req.user.name}, this is a protected route!`);
};


module.exports = getCards;