import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    businessName: "Kumar Kirana Store",
    contactPerson: "Sanjay Kumar",
    phone: "9876543210",
    address: "123, MG Road, Bangalore, Karnataka - 560001",
  },
  notifications: {
    newOrders: true,
    paymentsReceived: true,
    chatMessages: true,
    buyerRequests: true,
  },
};

const sellerSettingsSlice = createSlice({
  name: "sellerSettings",
  initialState,
  reducers: {
    updateProfileField(state, action) {
      const { field, value } = action.payload;
      state.profile[field] = value;
    },
    updateNotificationField(state, action) {
      const { field, value } = action.payload;
      state.notifications[field] = value;
    },
  },
});

export const { updateProfileField, updateNotificationField } =
  sellerSettingsSlice.actions;

export default sellerSettingsSlice.reducer;
