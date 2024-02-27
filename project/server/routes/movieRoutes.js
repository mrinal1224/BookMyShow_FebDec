const router = require('express').Router();
const Movie = require('../models/movieModel')

// Add a Movie

router.post('/add-movie' , async (req , res)=>{
    try {
         const newMovie = new Movie(req.body)
         await newMovie.save()
         res.send({
            success: true,
            message: 'New movie has been added!'
        })
    } catch (error) {
        res.send({
            success: false,
            message: err.message
        })
    }
})


module.exports = router
