// src/redux/calculatorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productPrice: 1110,
  interestRate: 5,
  timePeriod: 1,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setProductPrice: (state, action) => {
      state.productPrice = action.payload;
    },
    setInterestRate: (state, action) => {
      state.interestRate = action.payload;
    },
    setTimePeriod: (state, action) => {
      state.timePeriod = action.payload;
    },
  },
});

export const { setProductPrice, setInterestRate, setTimePeriod } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
