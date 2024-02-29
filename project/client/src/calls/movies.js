import {axiosInstance} from './index'



//get all Movies
export const getAllMovies = async ()=> {
    try {
        const response = await axiosInstance.get('api/movies/get-all-movies')
       return response.data
    } catch (error) {
        console.error(error)
    }
    
}



// Add a movie

export const addMovie = async (values)=> {
    try {
        const response = await axiosInstance.post('api/movies/add-movie' , values)
       return response.data
    } catch (error) {
        console.error(error)
    }
    
}