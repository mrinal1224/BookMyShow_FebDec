import {configureStore} from "@reduxjs/toolkit"
import loaderReducer from './loaderSlice'

const store = configureStore({
    reducer : {
        loader : loaderReducer
    }
  
})

export default store