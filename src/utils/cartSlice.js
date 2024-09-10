import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({

    name: "cartSlice",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
        resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
    },
    reducers:{
        addToCart:(state,action) => {
            console.log(action.payload);
            
            const {info,resInfo} = action.payload
            // setCartData((prev) => [...prev, info])
            state.resInfo = resInfo
            state.cartItems = [...state.cartItems ,info]
            localStorage.setItem("cartData",JSON.stringify(state.cartItems))
            localStorage.setItem("resInfo",JSON.stringify(resInfo));
        },
        deleteItem:(state,action) => {
            
            
            state.cartItems = action.payload
            localStorage.setItem("cartData",JSON.stringify(action.payload))
        },
        clearCart:(state,action) => {
              
            state.cartItems = []
            state.resInfo = []
            // localStorage.setItem("cartData",JSON.stringify([]))
            localStorage.removeItem("cartData");
            localStorage.removeItem("resInfo")
            

        },
    },

});

export default cartSlice.reducer;
export const {addToCart,deleteItem,clearCart} = cartSlice.actions