const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3000

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

let databaseName = "Test"; // outermost
let collectionName = "Testing"; // inside database

mongoose.connect(`mongodb+srv://wesleyjwolfe:U6wLRTmpDAaiAZIu@cluster0.llgejbp.mongodb.net/${databaseName}`)
const db = mongoose.connection

db.once('open',()=> {
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name:String,
    gameId:String
})

const Users = mongoose.model(collectionName,userSchema)

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async (req,res) => {
    const {name, gameId} = req.body
    const user = new Users ({
        name,
        gameId
    })
    await user.save()
    console.log(user)
    res.send("Form Submission Successful")
})

app.listen(port,() => {
    console.log("server started")
})