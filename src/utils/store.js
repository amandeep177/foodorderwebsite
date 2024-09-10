import { configureStore } from "@reduxjs/toolkit";
import toggleSlice  from "./toggleslice"
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";

const store = configureStore({
    reducer :{
       toggleSlice : toggleSlice,
       cartSlice : cartSlice,
       filterSlice: filterSlice,
    }
})

export default store;