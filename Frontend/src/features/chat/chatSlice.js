import { createSlice } from "@reduxjs/toolkit";

export const chatTypes = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
};

const initialState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChosenChatDetails: (state, action) => {
      const { chatDetails, chatType } = action.payload;
      state.chosenChatDetails = chatDetails;
      state.chatType = chatType;
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setChosenChatDetails, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
