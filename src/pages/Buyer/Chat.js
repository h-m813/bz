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
} from "../../redux/slices/chatSlice";

export default function ChatPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const chatList = useSelector((state) => state.chat.chatList);
  const selectedChatId = useSelector((state) => state.chat.selectedChatId);
  const mobileView = useSelector((state) => state.chat.mobileView);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(setMobileView(isMobile ? "list" : "both"));
  }, [isMobile, dispatch]);

  const selectedChat = chatList.find((chat) => chat.id === selectedChatId);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat?.messages]);

  const handleChatSelect = (id) => {
    dispatch(setSelectedChatId(id));
    if (isMobile) dispatch(setMobileView("chat"));
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const trimmed = input.trim();
    dispatch(addMessage(selectedChatId, { fromMe: true, text: trimmed }));
    setInput("");

    setTimeout(() => {
      dispatch(
        addMessage(selectedChatId, {
          fromMe: false,
          text: `Received: "${trimmed}"`,
        })
      );
    }, 1200);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4 },
        py: 4,
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          paddingRight: "10px",
          boxSizing: "border-box",
          display: isMobile ? "block" : "flex",
          height: isMobile ? "auto" : "calc(100vh - 64px)",
          gap: { xs: 0, md: 3 },
          position: "relative",
        }}
      >
        {/* Chat List */}
        {(mobileView === "list" || !isMobile) && (
          <Paper
            elevation={0}
            sx={{
              width: isMobile ? "100%" : 340,
              minWidth: 0,
              borderRadius: 4,
              p: 2,
              boxSizing: "border-box",
              mb: isMobile ? 2 : 0,
              height: isMobile ? "auto" : "100%",
              overflowY: "auto",
            }}
          >
            <Typography fontWeight={700} fontSize={18} mb={2}>
              Chats
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search chats..."
              sx={{
                mb: 2,
                background: "#f4f6f8",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  fontSize: 15,
                },
              }}
            />
            <Box>
              {chatList.map((chat) => (
                <Box
                  key={chat.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1.2,
                    px: 1,
                    borderRadius: 3,
                    backgroundColor:
                      selectedChatId === chat.id ? "#def0ff" : "transparent",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    mb: 0.5,
                    boxShadow:
                      selectedChatId === chat.id
                        ? "0 2px 10px rgba(25,118,210,0.06)"
                        : "none",
                    "&:hover": {
                      backgroundColor: "#e0efff",
                    },
                  }}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      fontWeight: "bold",
                      backgroundColor: "#ece9fa",
                      color: "#555",
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
                      variant="body2"
                      noWrap
                      sx={{ color: "#798293", userSelect: "none" }}
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

        {/* Chat Panel */}
        {(mobileView === "chat" || !isMobile) && selectedChat && (
          <Paper
            elevation={0}
            sx={{
              flexGrow: 1,
              height: isMobile ? "auto" : "100%",
              minHeight: "inherit",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f7fafd",
              position: "relative",
              boxShadow: isMobile ? "none" : "0 2px 20px rgba(25,118,210,0.06)",
            }}
          >
            {/* Header with marginRight on mobile */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                p: 2,
                pb: 1,
                bgcolor: "#fff",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                boxShadow: isMobile ? "0 1px 12px rgba(0,0,0,0.1)" : "none",
                marginLeft: isMobile ? -1 : 0, // Add right margin on mobile
                marginTop: isMobile ? -3 : 0, // Adjust for padding
              }}
            >
              {isMobile && (
                <IconButton
                  onClick={() => dispatch(setMobileView("list"))}
                  color="primary"
                  aria-label="Back"
                  sx={{ mr: 1 }}
                >
                  <ArrowBack />
                </IconButton>
              )}
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  fontWeight: "bold",
                  backgroundColor: "#dde8fc",
                  color: "#356bc8",
                  mr: 1.5,
                  fontSize: 18,
                }}
              >
                {selectedChat.initials}
              </Avatar>
              <Typography noWrap fontWeight="bold" variant="h6" component="div">
                {selectedChat.name}
              </Typography>
            </Box>

            <Divider />

            {/* Messages */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                px: 3,
                py: 2,
                backgroundColor: "#f7fafd",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {selectedChat.messages
                  ?.slice()
                  .reverse()
                  .map((msg, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        alignSelf: msg.fromMe ? "flex-end" : "flex-start",
                        backgroundColor: msg.fromMe ? "#cce4ff" : "#fff",
                        color: msg.fromMe ? "#003366" : "#21245a",
                        px: 3,
                        py: 1,
                        borderRadius: "16px",
                        maxWidth: "75%",
                        fontSize: 16,
                        fontWeight: 500,
                        wordBreak: "break-word",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      }}
                    >
                      {msg.text}
                    </Box>
                  ))}
              </Box>
              <div ref={messagesEndRef} />
            </Box>

            {/* Input section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                px: 3,
                backgroundColor: "#fff",
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                position: isMobile ? "fixed" : "relative",
                bottom: isMobile ? 0 : "auto",
                left: isMobile ? 0 : "auto",
                width: isMobile ? "calc(100vw - 15px)" : "auto", // Consider right margin
                zIndex: isMobile ? 1200 : "auto",
              }}
            >
              <InputBase
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                sx={{
                  flexGrow: 1,
                  backgroundColor: "#f4f6f8",
                  borderRadius: 2,
                  px: 2,
                  py: 1.25,
                  fontSize: 16,
                }}
                inputProps={{ "aria-label": "Message input" }}
              />
              <IconButton
                onClick={handleSend}
                color="primary"
                disabled={!input.trim()}
                aria-label="Send message"
                sx={{
                  ml: 1,
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  borderRadius: 2,
                  padding: 1.5,
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
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
