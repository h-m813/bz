import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subject: "",
  description: "",
};

const sellerSupportSlice = createSlice({
  name: "sellerSupport",
  initialState,
  reducers: {
    setSubject(state, action) {
      state.subject = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    clearForm(state) {
      state.subject = "";
      state.description = "";
    },
  },
});

export const { setSubject, setDescription, clearForm } =
  sellerSupportSlice.actions;

export default sellerSupportSlice.reducer;
