// features/testimonials/testimonialSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://bizbridgetech.onrender.com/api/v1/testimonial/all";

// Thunk to fetch testimonials
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      // ✅ Extract the array from your API schema
      if (response.data && Array.isArray(response.data.testimonials)) {
        // Map to match our UI field names
        return response.data.testimonials.map((item) => ({
          id: item._id,
          name: item.name,
          avatar: item.image, // API calls this 'image'
          quote: item.description, // API calls this 'description'
          role: `${item.designation}, ${item.companyName}`, // combine designation + company
          rating: 5, // default fixed rating since API doesn’t return rating
        }));
      }

      return [];
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

export default testimonialSlice.reducer;
