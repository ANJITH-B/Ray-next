import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

const signupSlice = createSlice({
  initialState: initialState,
  name: "signUpData",
  reducers: {
    signUpdata: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {signUpdata}=signupSlice.actions
export default signupSlice