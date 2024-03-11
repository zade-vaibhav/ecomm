import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/userSlice";


const store=configureStore({
    reducer:{
        user:userSlice
    }
})

export default store;