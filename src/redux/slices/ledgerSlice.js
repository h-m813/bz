// ledgerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ledgerData: [
    {
      date: "2023-10-25",
      buyer: "Kumar Retail",
      type: "Invoice",
      details: "#ORD001",
      debit: 5250,
      credit: 0,
      balance: 5250,
    },
    {
      date: "2023-10-26",
      buyer: "Kumar Retail",
      type: "Payment",
      details: "UPI Ref #123",
      debit: 0,
      credit: 5000,
      balance: 250,
    },
    {
      date: "2023-10-28",
      buyer: "Priya General Store",
      type: "Invoice",
      details: "#ORD002",
      debit: 12000,
      credit: 0,
      balance: 12250,
    },
    {
      date: "2023-11-05",
      buyer: "Priya General Store",
      type: "Payment",
      details: "UPI Ref #456",
      debit: 0,
      credit: 12000,
      balance: 250,
    },
    {
      date: "2023-11-06",
      buyer: "Super Mart",
      type: "Invoice",
      details: "#ORD003",
      debit: 1500,
      credit: 0,
      balance: 1750,
    },
  ],
  selectedBuyer: "All Buyers",
  buyersList: [
    "All Buyers",
    "Kumar Retail",
    "Priya General Store",
    "Super Mart",
  ],
};

const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {
    setSelectedBuyer(state, action) {
      state.selectedBuyer = action.payload;
    },
  },
});

export const { setSelectedBuyer } = ledgerSlice.actions;

export default ledgerSlice.reducer;
