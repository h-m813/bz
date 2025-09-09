import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputBase,
  Paper,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Send, ArrowBack } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedChatId,
  addMessage,
  setMobileView,
} from "../../redux/slices/SellerChatSlice";

export default function SellerChat() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.sellerChat.chatList);
  const selectedChatId = useSelector(
    (state) => state.sellerChat.selectedChatId
  );
  const mobileView = useSelector((state) => state.sellerChat.mobileView);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(setMobileView(isMobile ? "list" : "both"));
  }, [isMobile, dispatch]);

  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);

  // Scroll to bottom only when messages change or chat changes
  useEffect(() => {
    if (messagesEndRef.current && selectedChat?.messages?.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatId, selectedChat?.messages?.length]);

  const handleChatSelect = (chatId) => {
    dispatch(setSelectedChatId(chatId));
    if (isMobile) dispatch(setMobileView("chat"));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const trimmedText = input.trim();

    dispatch(
      addMessage({
        chatId: selectedChatId,
        message: { fromMe: true, text: trimmedText },
      })
    );
    setInput("");

    setTimeout(() => {
      const botResponse = `Received: "${trimmedText}"`;
      dispatch(
        addMessage({
          chatId: selectedChatId,
          message: { fromMe: false, text: botResponse },
        })
      );
    }, 1200);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        background: "#f8fafc",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          maxWidth: 1200,
          mx: "auto",
          boxSizing: "border-box",
          display: "flex",
          bgcolor: "#f8fafc",
        }}
      >
        {(mobileView === "list" || !isMobile) && (
          <Paper
            elevation={0}
            sx={{
              width: isMobile ? "100vw" : 340,
              minWidth: 0,
              borderRadius: 0,
              p: 2,
              boxSizing: "border-box",
              height: "100vh",
              overflowY: "auto",
              borderRight: { sm: "1px solid #e0e7ef", xs: "none" },
              bgcolor: "#fff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Chats
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search chats..."
              sx={{
                mb: 2,
                bgcolor: "#f0f4fa",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": { fontSize: 15 },
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              {chatList.map((chat) => (
                <Box
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1.2,
                    px: 1,
                    borderRadius: 2,
                    backgroundColor:
                      selectedChatId === chat.id ? "#def0ff" : "transparent",
                    cursor: "pointer",
                    mb: 0.5,
                    "&:hover": { backgroundColor: "#e5efff" },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      fontWeight: "bold",
                      bgcolor: "#e9f0ff",
                      color: "#3a4d7f",
                      mr: 1.5,
                      fontSize: 18,
                    }}
                  >
                    {chat.initials}
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      fontWeight="bold"
                      noWrap
                      sx={{ userSelect: "none" }}
                    >
                      {chat.name}
                    </Typography>
                    <Typography
                      noWrap
                      variant="body2"
                      color="text.secondary"
                      sx={{ userSelect: "none" }}
                    >
                      {chat.lastMessage}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ml: 1,
                      minWidth: 55,
                      textAlign: "right",
                      userSelect: "none",
                    }}
                  >
                    <Typography variant="caption" color="text.disabled">
                      {chat.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        )}

        {(mobileView === "chat" || !isMobile) && selectedChat && (
          <Paper
            elevation={0}
            sx={{
              flexGrow: 1,
              height: "100vh",
              minHeight: "100vh",
              borderRadius: 0,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              position: "relative",
              p: 0,
              boxShadow: isMobile ? "0 -4px 10px rgba(0,0,0,0.1)" : "none",
              maxWidth: "100vw",
              overflow: "hidden",
            }}
          >
            {/* Chat header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                pb: 1,
                bgcolor: "#f3f8ff",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                boxShadow: "0 2px 6px rgba(50, 115, 220, 0.15)",
                flexShrink: 0,
              }}
            >
              {isMobile && (
                <IconButton
                  color="primary"
                  onClick={() => dispatch(setMobileView("list"))}
                  sx={{ mr: 1 }}
                  aria-label="Back to chat list"
                >
                  <ArrowBack />
                </IconButton>
              )}
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: "#dde8fc",
                  color: "#356bc8",
                  fontWeight: "bold",
                  fontSize: 18,
                  mr: 1.5,
                  userSelect: "none",
                }}
              >
                {selectedChat.initials}
              </Avatar>
              <Typography fontWeight="bold" variant="h6" noWrap>
                {selectedChat.name}
              </Typography>
            </Box>
            <Divider />

            {/* Message list */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                px: { xs: 1, sm: 3 },
                py: { xs: 1, sm: 2 },
                bgcolor: "#f7fafd",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minHeight: 0,
                height: "100%",
              }}
            >
              {selectedChat.messages &&
                selectedChat.messages.map((msg, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      alignSelf: msg.fromMe ? "flex-end" : "flex-start",
                      bgcolor: msg.fromMe ? "#cce4ff" : "#e3e6f3",
                      color: msg.fromMe ? "#003366" : "#212b45",
                      px: 3,
                      py: 1.5,
                      borderRadius: "16px",
                      maxWidth: "75%",
                      fontSize: 16,
                      fontWeight: 500,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      wordBreak: "break-word",
                      userSelect: "text",
                    }}
                  >
                    {msg.text}
                  </Box>
                ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input area */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor: "#fff",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
                gap: 1,
                flexShrink: 0,
                position: isMobile ? "fixed" : "static",
                bottom: isMobile ? 0 : "unset",
                left: isMobile ? 0 : "unset",
                width: isMobile ? "100vw" : "auto",
                maxWidth: isMobile ? "100vw" : "unset",
              }}
            >
              <InputBase
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                sx={{
                  flexGrow: 1,
                  bgcolor: "#f0f4fa",
                  borderRadius: 8,
                  px: 3,
                  py: 1.5,
                  fontSize: 16,
                  boxShadow: "inset 0 2px 2px rgba(0,0,0,0.06)",
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                aria-label="Send message"
                sx={{
                  bgcolor: "#1976d2",
                  color: "#fff",
                  p: 1.2,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#1565c0" },
                }}
                disabled={!input.trim()}
              >
                <Send />
              </IconButton>
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  );
}
