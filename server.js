const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 3221

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

const databaseName = "fromMongo"
const collectionName = "game"

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.once('open', () => {
    console.log("Mongodb connection successful") 
})

const userSchema = new mongoose.Schema({
    name: String,
    gameId: String
})

const Users = mongoose.model(collectionName, userSchema)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'))
})

app.post('/post', async (req, res) => {
    const { name, gameId } = req.body
    const user = new Users({
        name,
        gameId
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
