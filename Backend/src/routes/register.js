const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const crypto = require('crypto');


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
                customId: generateCustomId(),
                name: req.body.name,
                password: password,
                backgoundColor: generateRandomColor(),
                token: generateToken()
            })
            console.log('created user:',user);
            
            await user.save()
            return res.status(201).json({
                "id": user.customId,
                "name": user.name,
                "bg-color": user.backgoundColor,
                "token": user.token
            })
        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
})


/**
 * Generates a unique identifier for each user based on the current timestamp and a random value.
 * The format of the generated id is as follows: <timestamp_in_hex>-<random_hex_value>
 * @returns {string} The generated id
 */
function generateCustomId() {
    const randomPart = crypto.randomBytes(8).toString('hex');
    const timestampPart = Date.now().toString(16);
    return `${timestampPart + randomPart}`;
};


/**
 * Generates a random hex color in the format #RRGGBB
 * @returns {string} The generated color
 */
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/**
 * Generates a random token using cryptographic random bytes.
 * This token is suitable for use in secure contexts, such as
 * authentication or session management.
 * 
 * @returns {string} A 48-byte random token in hexadecimal format
 */
function generateToken() {
    return require('crypto').randomBytes(48).toString('hex');
}


module.exports = registerRouter