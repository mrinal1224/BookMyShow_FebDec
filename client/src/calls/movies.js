@@ .. @@
-import {axiosInstance} from './index'
-
-
+import { axiosInstance } from './index';
+import { API_ENDPOINTS } from '../utils/constants';

-//get all Movies
-export const getAllMovies = async ()=> {
+// Get all Movies
+export const getAllMovies = async () => {
     try {
-        const response = await axiosInstance.get('api/movies/get-all-movies')
-       return response.data
+        const response = await axiosInstance.get(API_ENDPOINTS.MOVIES.GET_ALL);
+        return response.data;
     } catch (error) {
-        console.error(error)
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
     }
-    
-}
-
-
+};

-// Add a movie
-
-export const addMovie = async (values)=> {
+// Add a movie
+export const addMovie = async (values) => {
     try {
-        const response = await axiosInstance.post('api/movies/add-movie' , values)
-       return response.data
+        const response = await axiosInstance.post(API_ENDPOINTS.MOVIES.ADD, values);
+        return response.data;
     } catch (error) {
-        console.error(error)
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
     }
-    
-}
-
+};

+// Update movie
 export const updateMovie = async (payload) => {
-    try{
-        const response = await axiosInstance.put('/api/movies/update-movie', payload);
+    try {
+        const response = await axiosInstance.put(API_ENDPOINTS.MOVIES.UPDATE, payload);
         return response.data;
-    }catch(err){
-        return err.message
+    } catch (error) {
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
     }
-}
+};

 // Delete a movie
 export const deleteMovie = async (payload) => {
-    try{
-        const response = await axiosInstance.put('/api/movies/delete-movie', payload);
+    try {
+        const response = await axiosInstance.put(API_ENDPOINTS.MOVIES.DELETE, payload);
         return response.data;
-    }catch(err){
-        return err.message
+    } catch (error) {
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
     }
-}
+};

 // Get a single movie by its id
 export const getMovieById = async (id) => {
-    try{
-        const response = await axiosInstance.get(`/api/movies/movie/${id}`)
+    try {
+        const response = await axiosInstance.get(API_ENDPOINTS.MOVIES.GET_BY_ID(id));
         return response.data;
-    }catch(err){
-        return err.response
+    } catch (error) {
+        return {
+            success: false,
+            message: error.response?.data?.message || error.message
+        };
     }
-}
+};