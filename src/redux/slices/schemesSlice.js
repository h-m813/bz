// redux/slices/schemesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialSchemes = [
  {
    id: "SCH001",
    title: "Diwali Dhamaka",
    type: "Discount",
    details: "20% off on all oils",
    buyersReached: 75,
    active: true,
  },
  {
    id: "SCH002",
    title: "Bulk Buy Bonanza",
    type: "Freebie",
    details: "Free 1kg Sugar on 10kg Rice",
    buyersReached: 52,
    active: true,
  },
  {
    id: "SCH003",
    title: "clearance Sale",
    type: "Discount",
    details: "50% off on select items",
    buyersReached: 112,
    active: false,
  },
];

const schemesSlice = createSlice({
  name: "schemes",
  initialState: initialSchemes,
  reducers: {
    toggleActive(state, action) {
      const index = state.findIndex((sch) => sch.id === action.payload);
      if (index !== -1) {
        state[index].active = !state[index].active;
      }
    },
    addScheme(state, action) {
      // Add new scheme object to the state array
      state.push(action.payload);
    },
  },
});

export const { toggleActive, addScheme } = schemesSlice.actions;
export default schemesSlice.reducer;
