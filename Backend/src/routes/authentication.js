const { User, validate } = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const crypto = require('crypto');

const cors = require('cors');
router.use(cors());

router.post('/register', async (req, res) => {

    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findOne({ name: req.body.name })

    if (user) {
        return res.status(400).send('User already exisits. Please sign in')
    } else {
        try {
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(req.body.password, salt)
            const userData = getUserData(req.body, password);
            console.log('created user:', userData);

            await userData.save().then(() => {
                return res.status(201).json({
                    "id": userData.customId,
                    "name": userData.name,
                    "bg-color": userData.backgoundColor,
                    "token": userData.token
                });
            })

        } catch (err) {
            return res.status(400).json({ message: err.message })
        }
    }
});

router.post('/login', async (req, res) => {
    const { name, password } = req.body

    const user = await User.findOne({ name: name })
    if (!user) {
        return res.status(400).send('Invalid username or password')
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).send('Invalid username or password')
    }

    // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.status(200).json({
        id: user.customId,
        name: user.name,
        bgColor: user.backgroundColor,
    })
})



/**
 * Creates a new User object based on the given body and password.
 * @param {Object} body The request body containing the user's name and email
 * @param {string} password The hashed password
 * @returns {User} The new User object
 */
function getUserData(body, password) {
    return new User({
        customId: generateCustomId(),
        name: body.name,
        email: body.name,
        password: password,
        backgoundColor: generateRandomColor(),
        token: generateToken()
    })
}


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


module.exports = router