import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    fullName: "Sanjay Kumar",
    phone: "9876543210",
    email: "sanjay@kumar.com",
    business: "Kumar Retail",
  },
  notifications: {
    orderUpdates: true,
    newOffers: true,
    chatMessages: false,
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
    setNotifications(state, action) {
      state.notifications = { ...state.notifications, ...action.payload };
    },
  },
});

export const { setProfile, setNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;
