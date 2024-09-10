import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggleSlice",
    initialState : {
        searchBarToggle : false
    },
    reducers : {
         toggleSearchBar : (state , action)=> {
            state.searchBarToggle = !state.searchBarToggle
         }
    }
})

export const {toggleSearchBar} = toggleSlice.actions
export default toggleSlice.reducer