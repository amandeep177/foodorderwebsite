import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: " authSlice",
    initialState : {
        userData : JSON.parse(localStorage.getItem("userData"))
    },

    reducers : {
        adduserData : (state,action) => {
            state.userData = action.payload 
            localStorage.setItem("userData", JSON.stringify(action.payload))
        },
        removeUserData : (state,action) => {
            state.userData = null
            localStorage.removeItem("userData")

        }
   
    }
})

export const {adduserData,removeUserData} = authSlice.actions;
export default authSlice.reducer;