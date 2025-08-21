// src/Components/VerifyOTP.js
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOtp,
  forgotPassword,
  clearErrors,
  resetOperation,
} from "../redux/slices/userSlice";
import { message } from "antd";

const OTP_EXPIRE_TIME = 180; // OTP expire time in seconds (3 minutes)

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  // Get email from navigation state (fallback to redirect)
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");

  const { loading, error, success, token } = useSelector(
    (state) => state.user.operations.otpVerification
  );

  const [resendLoading, setResendLoading] = useState(false);

  // Timer related state
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRE_TIME); // in seconds
  const timerRef = useRef(null);

  // Function to format timeLeft as MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Start or restart timer
  const startTimer = () => {
    setTimeLeft(OTP_EXPIRE_TIME);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (!email) navigate("/forgot-password"); // Enforce flow

    // Start timer on mount
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [email, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (success && token) {
      dispatch(resetOperation("otpVerification"));
      message.success("OTP verified successfully.");
      navigate("/reset-password", { state: { token } });
    }
  }, [error, success, token, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeLeft === 0) {
      message.error("OTP has expired. Please resend OTP.");
      return;
    }
    dispatch(verifyOtp({ email, otp }));
  };

  // Resend OTP handler
  const handleResendOtp = () => {
    if (timeLeft > 0) return; // Prevent resend if timer is not finished

    setResendLoading(true);
    dispatch(forgotPassword({ email }))
      .unwrap()
      .then(() => {
        message.success("OTP has been resent to your email.");
        // Restart timer on resend
        startTimer();
      })
      .catch((err) => {
        message.error(err || "Failed to resend OTP");
      })
      .finally(() => setResendLoading(false));
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
          Verify OTP
        </Typography>
        <TextField
          placeholder="Enter OTP"
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
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
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
          {loading ? "Verifying..." : "VERIFY OTP"}
        </Button>
        <Button
          variant="text"
          onClick={handleResendOtp}
          disabled={resendLoading || loading || timeLeft > 0}
          sx={{
            background: "#19d2aaff",
            color: "#19d2aaff",
            mt: 1,
            fontWeight: "bold",
            textTransform: "none",
            cursor: timeLeft === 0 ? "pointer" : "default",
            "&:hover": {
              textDecoration: timeLeft === 0 ? "underline" : "none",
              background: "transparent",
            },
          }}
        >
          {resendLoading
            ? "Resending..."
            : timeLeft > 0
            ? `Resend OTP in ${formatTime(timeLeft)}`
            : "Resend OTP"}
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyOTP;
