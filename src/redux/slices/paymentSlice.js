import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for submitting the contact form using axios
export const submitContactForm = createAsyncThunk(
  "payment/submitContactForm",
  async ({ name, email, phone, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://bizbridgetech.onrender.com/api/v1/contact/create",
        { name, email, phone, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Axios automatically parses JSON for us in response.data
      return response.data;
    } catch (error) {
      // Axios errors may have response, message, etc.
      if (error.response && error.response.data) {
        // The backend responded with an error message
        const errorMsg =
          error.response.data.message || "Failed to send the contact request";
        return rejectWithValue(errorMsg);
      } else {
        return rejectWithValue(error.message || "Something went wrong!");
      }
    }
  }
);

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  loading: false,
  error: null,
  success: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhone(state, action) {
      state.phone = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    resetForm(state) {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.message = "";
      state.error = null;
      state.success = null;
      state.loading = false;
    },
    clearStatus(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Your message has been sent successfully!";
        state.error = null;
        // Reset form fields on success
        state.name = "";
        state.email = "";
        state.phone = "";
        state.message = "";
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
        state.success = null;
      });
  },
});

export const {
  setName,
  setEmail,
  setPhone,
  setMessage,
  resetForm,
  clearStatus,
} = paymentSlice.actions;

export default paymentSlice.reducer;
