import { createSlice } from "@reduxjs/toolkit";
import { lang_library } from "../constants";




const langSlice = createSlice({
    name:'lang',
    initialState:'Chinese',
    reducers:{
        setLang:(state, action) => {
           return action.payload.newLang; 
        }
    }
})

export const { setLang } = langSlice.actions;
export default langSlice.reducer