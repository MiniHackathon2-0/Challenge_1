require('dotenv').config()

const registerRouter = require('./routes/register')
const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
mongoose.connect(process.env.DATABASE_URL)
mongoose.set('strictQuery', true)
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))
app.use('/api', registerRouter)