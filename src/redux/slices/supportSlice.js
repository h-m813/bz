import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  ticketForm: {
    subject: "",
    details: "",
  },
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    setTicketForm(state, action) {
      state.ticketForm = { ...state.ticketForm, ...action.payload };
    },
    addTicket(state, action) {
      state.tickets.push(action.payload);
    },
    resetForm(state) {
      state.ticketForm = { subject: "", details: "" };
    },
  },
});

export const { setTicketForm, addTicket, resetForm } = supportSlice.actions;

export default supportSlice.reducer;
