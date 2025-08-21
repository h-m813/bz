import { Phone } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  Phone: "",
  message: "",
};

const contactFormSlice = createSlice({
  name: "contactForm",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = contactFormSlice.actions;
export default contactFormSlice.reducer;
