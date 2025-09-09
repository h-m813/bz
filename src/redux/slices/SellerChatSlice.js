import { createSlice } from "@reduxjs/toolkit";

const initialChatList = [
  {
    id: 1,
    name: "Kumar Kirana Store",
    initials: "KK",
    lastMessage: "",
    time: "",
    messages: [],
  },
  {
    id: 2,
    name: "Sharma Textiles",
    initials: "ST",
    lastMessage: "",
    time: "",
    messages: [],
  },
  {
    id: 3,
    name: "Singh Electronics",
    initials: "SE",
    lastMessage: "",
    time: "",
    messages: [],
  },
  {
    id: 4,
    name: "Goyal Groceries",
    initials: "GG",
    lastMessage: "",
    time: "",
    messages: [],
  },
];

const sellerChatSlice = createSlice({
  name: "sellerChat",
  initialState: {
    chatList: initialChatList,
    selectedChatId: initialChatList[0].id,
    mobileView: "both",
  },
  reducers: {
    setSelectedChatId(state, action) {
      state.selectedChatId = action.payload;
    },
    addMessage(state, action) {
      const { chatId, message } = action.payload;
      const chat = state.chatList.find((c) => c.id === chatId);
      if (chat) {
        if (!chat.messages) chat.messages = [];
        chat.messages.push(message);
        chat.lastMessage = message.text;
        chat.time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    },
    setMobileView(state, action) {
      state.mobileView = action.payload;
    },
    setChatList(state, action) {
      state.chatList = action.payload;
    },
  },
});

export const { setSelectedChatId, addMessage, setMobileView, setChatList } =
  sellerChatSlice.actions;

export default sellerChatSlice.reducer;
