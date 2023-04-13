const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(
    "mongodb+srv://arreyetta1jnr:mandela1212@cluster0.rmlamlt.mongodb.net/test"
)

app.use(bodyParser.json())

const shortenRoute = require("./routes/url")

app.use('/api', shortenRoute)

app.listen(process.env.PORT || 5000)
