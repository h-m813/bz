import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import contactFormReducer from "./slices/contactFormSlice";
import testimonialReducer from "../redux/slices/testimonialSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
    contactForm: contactFormReducer,
    testimonials: testimonialReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
