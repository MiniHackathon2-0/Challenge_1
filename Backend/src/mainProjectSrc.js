require('dotenv').config()

const authRouter = require('./routes/authentication')
const crudRouter = require('./routes/protectedRoutes')
const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = process.env.PORT || 8080
const app = express()
const cors = require('cors');


app.use(express.json())
mongoose.connect(process.env.DATABASE_URL)
mongoose.set('strictQuery', true)
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(cors({
    origin: 'http://127.0.0.1:5500', // Erlaube nur diese Domain (oder '*' für alle Domains)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Optional, falls Cookies/Authentifizierungsdaten nötig sind
}));


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Erlaube alle Domains (oder spezifische Domain angeben)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Erlaube diese HTTP-Methoden
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Erlaube diese Header
    res.header('Access-Control-Allow-Credentials', 'true'); // Optional, falls du Cookies senden möchtest

    // Behandle Preflight-Anfragen
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Antworte mit Status 200 auf OPTIONS
    }

    next(); // Weiter zur nächsten Middleware/Route
});

app.use('/auth', authRouter)
app.use('/api', crudRouter)

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))