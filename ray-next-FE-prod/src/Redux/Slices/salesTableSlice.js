import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const salesTableSlice = createSlice({
  initialState: initialState,
  name: "salesTableData",
  reducers: {
    salesTableData: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const {salesTableData}=salesTableSlice.actions
export default salesTableSlice