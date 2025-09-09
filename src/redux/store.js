import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import paymentReducer from "./slices/paymentSlice";
import contactFormReducer from "./slices/contactFormSlice";
import testimonialReducer from "./slices/testimonialSlice";
import chatReducer from "./slices/chatSlice";
import sellerChatReducer from "./slices/SellerChatSlice"; // updated import
import settingsReducer from "./slices/settingsSlice";
import supportReducer from "./slices/supportSlice";
import catalogReducer from "./slices/catalogSlice";
import schemesReducer from "./slices/schemesSlice";
import ledgerReducer from "./slices/ledgerSlice";
import ordersReducer from "./slices/ordersSlice";
import buyerNetworkReducer from "./slices/buyerNetworkSlice";
import sellerSettingsReducer from "./slices/sellerSettingsSlice";
import sellerSupportReducer from "./slices/sellerSupportSlice";
import calculatorReducer from "./slices/calculatorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    payment: paymentReducer,
    contactForm: contactFormReducer,
    chat: chatReducer,
    testimonials: testimonialReducer,
    settings: settingsReducer,
    support: supportReducer,
    catalog: catalogReducer,
    schemes: schemesReducer,
    ledger: ledgerReducer,
    orders: ordersReducer,
    buyerNetwork: buyerNetworkReducer,
    sellerChat: sellerChatReducer, // Use lowercase key sellerChat
    sellerSettings: sellerSettingsReducer,
    sellerSupport: sellerSupportReducer,
    calculator: calculatorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
