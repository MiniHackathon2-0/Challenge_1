const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()


const registerRouter = router.post('/register', async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({ name: req.body.name })
    
    if (user) {
        return res.status(400).send('User already exisits. Please sign in')
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                name: req.body.name,
                password: password,
                backgoundColor: generateRandomColor()
            })
            await user.save()
            return res.status(201).json({
                "name": user.name,
                "bg-color": user.backgroundColor})
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})


function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = registerRouter