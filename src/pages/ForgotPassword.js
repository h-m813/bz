// src/Components/ForgotPassword.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearErrors,
  resetOperation,
} from "../redux/slices/userSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm")); // true for <600px
  const isMd = useMediaQuery(theme.breakpoints.down("md")); // true for <900px
  const [email, setEmail] = useState("");

  const { loading, error, success } = useSelector(
    (state) => state.user.operations.forgotPassword
  );

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      message.success("OTP sent to your email. Please check your inbox.");
      dispatch(resetOperation("forgotPassword"));
      navigate("/verify-otp", { state: { email } });
    }
  }, [error, success, dispatch, navigate, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  // Responsive card width
  let cardWidth;
  if (isSm) {
    cardWidth = "100%";
  } else if (isMd) {
    cardWidth = "65%";
  } else {
    cardWidth = "400px";
  }

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        minHeight: "100vh",
        bgcolor: "#091021",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: cardWidth,
          bgcolor: "#0F1A2B",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
          px: isSm ? 2 : 5,
          py: isSm ? 4 : 5,
          mx: isSm ? 1 : "auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant={isSm ? "h5" : "h4"}
          sx={{
            fontWeight: 700,
            color: "#33FFD1",
            letterSpacing: 1,
            mb: 4,
            mt: 1,
          }}
        >
          Forgot Password
        </Typography>
        <TextField
          placeholder="Enter Your Email"
          fullWidth
          required
          autoFocus
          variant="outlined"
          sx={{
            mb: 4,
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#152340",
              borderRadius: 2,
            },
            "& input": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#33FFD1" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00FFAB",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined sx={{ color: "#33FFD1" }} />
              </InputAdornment>
            ),
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          fullWidth
          type="submit"
          disabled={loading}
          sx={{
            background: "linear-gradient(90deg, #00FFAB 30%, #33FFD1 100%)",
            color: "#091021",
            borderRadius: 2,
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: 17,
            py: 1.5,
            mb: 1,
            boxShadow: "0 2px 8px rgba(0,255,171,0.12)",
            "&:hover": {
              background: "linear-gradient(90deg, #00e2a0 30%, #13ccb7 100%)",
            },
          }}
        >
          {loading ? "Sending OTP..." : "SEND OTP"}
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
