// ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ORDER_DATA = [
  {
    id: "ORD001",
    date: "2023-10-25",
    buyer: "Kumar Retail",
    items: 5,
    amount: 5250,
    status: "Delivered",
  },
  {
    id: "ORD002",
    date: "2023-10-28",
    buyer: "Priya General Store",
    items: 2,
    amount: 12000,
    status: "Shipped",
  },
  {
    id: "ORD003",
    date: "2023-11-01",
    buyer: "Kumar Retail",
    items: 8,
    amount: 3500,
    status: "Pending",
  },
  {
    id: "ORD004",
    date: "2023-11-02",
    buyer: "Super Mart",
    items: 1,
    amount: 25000,
    status: "Pending",
  },
  {
    id: "ORD005",
    date: "2023-11-04",
    buyer: "Priya General Store",
    items: 12,
    amount: 1800,
    status: "Delivered",
  },
];

const TABS = [
  { label: "All", filter: () => true },
  { label: "Pending", filter: (o) => o.status === "Pending" },
  { label: "Shipped", filter: (o) => o.status === "Shipped" },
  { label: "Delivered", filter: (o) => o.status === "Delivered" },
];

const initialState = {
  orders: ORDER_DATA,
  tabs: TABS,
  activeTabIndex: 0,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setActiveTab(state, action) {
      state.activeTabIndex = action.payload;
    },
  },
});

export const { setActiveTab } = ordersSlice.actions;

export default ordersSlice.reducer;
