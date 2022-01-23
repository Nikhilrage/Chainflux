require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const admin = require("./routes/admin.js")
const employee = require("./routes/employee.js")
const search = require("./routes/search.js")

console.log(process.env)
app.use(cors({
    origin:'*'
}))


mongoose.connect('mongodb://localhost/chainfluxAdmin')
const db = mongoose.connection
db.on('open', function(){console.log("database connected")})


app.use(express.json())
app.use('/admin', admin)
app.use('/employee', employee)
app.use('/search', search)


app.listen((2000), function(){(console.log("Server started"))})