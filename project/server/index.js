const express = require('express')
var cors = require('cors')

require('dotenv').config();

const dbConfig = require('./config/dbConfig')


const PORT = 8081

const app = express()

const userRoutes = require('./routes/userRoutes')
const movieRoute = require('./routes/movieRoutes')
const theatreRoute = require('./routes/theatreRoute')
app.use(cors())
app.use(express.json())
app.use('/api/users' , userRoutes)
app.use('/api/movies' , movieRoute)
app.use('/api/theatres' , theatreRoute )




app.listen(PORT , ()=>{
    console.log("server running")
})




