@@ .. @@
 const router = require('express').Router();
-const Movie = require('../models/movieModel')
+const Movie = require('../models/movieModel');
+const { validateMovie } = require('../middlewares/validation');
+const { successResponse, errorResponse, serverErrorResponse, notFoundResponse } = require('../utils/responseHelper');

 // Add a Movie
-
-router.post('/add-movie' , async (req , res)=>{
+router.post('/add-movie', validateMovie, async (req, res) => {
     try {
-         const newMovie = new Movie(req.body)
-         await newMovie.save()
-         res.send({
-            success: true,
-            message: 'New movie has been added!'
-        })
+        const newMovie = new Movie(req.body);
+        await newMovie.save();
+        successResponse(res, 'Movie added successfully!', newMovie, 201);
     } catch (error) {
-        res.send({
-            success: false,
-            message: error.message
-        })
+        serverErrorResponse(res, error);
     }
-})
-
+});

 // Get all the movies
-
-router.get('/get-all-movies' , async(req , res)=>{
-  try {
+router.get('/get-all-movies', async (req, res) => {
+    try {
         const allMovies = await Movie.find();
-        res.send({
-            success: true,
-            message: 'All movies have been fetched!',
-            data: allMovies
-        });
-        
+        successResponse(res, 'Movies retrieved successfully', allMovies);
     } catch (error) {
-        res.send({
-            success: false,
-            message: error.message
-        });
+        serverErrorResponse(res, error);
     }
-})
-
+});

-// Update a movie
-
 // Update a movie
-router.put('/update-movie', async (req, res) => {
-    try{
-        const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
-        res.send({
-            success: true,
-            message: 'The movie has been updated!',
-            data: movie
-        })
-    }catch(err){
-        res.send({
-            success: false,
-            message: err.message
-        })
+router.put('/update-movie', validateMovie, async (req, res) => {
+    try {
+        const movie = await Movie.findByIdAndUpdate(
+            req.body.movieId, 
+            req.body, 
+            { new: true }
+        );
+        
+        if (!movie) {
+            return notFoundResponse(res, 'Movie');
+        }
+        
+        successResponse(res, 'Movie updated successfully!', movie);
+    } catch (error) {
+        serverErrorResponse(res, error);
     }
 });

+// Delete a movie
 router.put('/delete-movie', async (req, res) => {
-    try{
-        await Movie.findByIdAndDelete(req.body.movieId);
-        console.log(req.body.movieId);
-        res.send({
-            success: true,
-            message: 'The movie has been deleted!',
-        });
-    }catch(err){
-        res.send({
-            success: false,
-            message: err.message
-        });
+    try {
+        const movie = await Movie.findByIdAndDelete(req.body.movieId);
+        
+        if (!movie) {
+            return notFoundResponse(res, 'Movie');
+        }
+        
+        successResponse(res, 'Movie deleted successfully!');
+    } catch (error) {
+        serverErrorResponse(res, error);
     }
-})
+});

 // Fetch single movie by id
 router.get('/movie/:id', async (req, res) => {
-    try{
+    try {
         const movie = await Movie.findById(req.params.id);
-        res.send({
-            success: true,
-            message: "Movie fetched successfully!",
-            data: movie
-        })
-
-    }catch(err){
-        res.send({
-            success: false,
-            message: err.message
-        })
+        
+        if (!movie) {
+            return notFoundResponse(res, 'Movie');
+        }
+        
+        successResponse(res, 'Movie retrieved successfully!', movie);
+    } catch (error) {
+        serverErrorResponse(res, error);
     }
 });

-
-
-
-
-
-//APi end 
-
-
-// update the movie , delete the movie , get all the movies
-
-
-module.exports = router
+module.exports = router;