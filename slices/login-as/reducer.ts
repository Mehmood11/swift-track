// loginAsSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginAs: '',
};

const slice = createSlice({
    name: "login-as",
    initialState,
    reducers: {
        loginAs: (state, action) => {
            state.loginAs = action.payload;
        },
    },
});

export const loginAsAction = slice.actions;
export const loginAsReducer = slice.reducer;
