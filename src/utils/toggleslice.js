import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggleSlice",
    initialState : {
        searchBarToggle : false,
        loginToggle : false,
    },
    reducers : {
         toggleSearchBar : (state , action)=> {
            state.searchBarToggle = !state.searchBarToggle
         },
         toggleLogin : (state,action) => {
            state.loginToggle = !state.loginToggle
         }
    }
})

export const {toggleSearchBar,toggleLogin} = toggleSlice.actions
export default toggleSlice.reducer