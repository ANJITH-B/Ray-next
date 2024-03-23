import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import signupSlice from "./Slices/authSlices";
import salesTableSlice from "./Slices/salesTableSlice";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  {
    reducer: {
      signup: signupSlice.reducer,
      salesTableData: salesTableSlice.reducer,
    },
  },

  composeEnhancers(applyMiddleware())
);

export default store;
