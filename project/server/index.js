const express = require('express')

require('dotenv').config();

const dbConfig = require('./config/dbConfig')

const app = express()

const userRoutes = require('./routes/userRoutes')
app.use(express.json())
app.use('/api/users' , userRoutes)


const PORT = 8081





app.listen(PORT , ()=>{
    console.log("server running")
})

