import { createSlice } from "@reduxjs/toolkit";
import { lang_library } from "../constants";




const langSlice = createSlice({
    name:'lang',
    initialState:lang_library.Chinese_sim,
    reducers:{
        setLang:(state, action) => {
           return action.payload.newLang; 
        }
    }
})

export const { setLang } = langSlice.actions;
export default langSlice.reducer