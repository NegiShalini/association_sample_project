const express = require('express')
const db = require('./server/models')

const app = express()

app.listen(7000,()=>{console.log("Server started successfulyy")})

//get student with address