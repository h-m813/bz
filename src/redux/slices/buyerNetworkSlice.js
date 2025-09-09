import { createSlice } from "@reduxjs/toolkit";

const initialBuyers = [
  {
    initials: "KR",
    name: "Kumar Retail",
    city: "Bangalore",
    outstanding: 250,
    ledgerUrl: "#",
    status: "Connected",
  },
  {
    initials: "PG",
    name: "Priya General Store",
    city: "Bangalore",
    outstanding: 0,
    ledgerUrl: "#",
    status: "Connected",
  },
  {
    initials: "SM",
    name: "Super Mart",
    city: "Mysore",
    outstanding: 1500,
    ledgerUrl: "#",
    status: "Connected",
  },
];

const initialState = {
  buyers: initialBuyers,
  tabValue: 0, // 0 = Connected, 1 = Pending Requests
  searchValue: "",
};

const buyerNetworkSlice = createSlice({
  name: "buyerNetwork",
  initialState,
  reducers: {
    setTabValue(state, action) {
      state.tabValue = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setTabValue, setSearchValue } = buyerNetworkSlice.actions;
export default buyerNetworkSlice.reducer;
