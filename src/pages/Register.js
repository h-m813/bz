import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  EmailOutlined,
  LockOutlined,
  PhoneIphone as PhoneIcon,
  Google as GoogleIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { userRegister, clearErrors } from "../redux/slices/userSlice";

import axios from "../axiosInstance";

const Register = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Reset all fields on mount
  useEffect(() => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setShowPassword(false);
  }, []);

  // Error handling
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    // if (isAuthenticated) navigate("/");
  }, [error, isAuthenticated, navigate, dispatch]);

  // Check server status
  const checkServerStatus = async () => {
    try {
      const response = await axios.get("/api/status");
      if (response?.data?.data !== true) {
        message.error(
          "Oops! Something went wrong. Please try again later or contact support."
        );
      }
    } catch {
      message.error(
        "Error: Oops! Something went wrong. Please try again later or contact support."
      );
    }
  };

  // On form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    checkServerStatus();
    dispatch(userRegister({ name, email, phone, password }));
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <PageTitle
        title="Register - Bizbridge"
        description="Create your Bizbridge account to access all features and services."
      />
      {/* Full background */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          background: "#0a1122", // Slightly more blue than #091021 for accent, adjust as needed
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            background: "#101a2d",
            borderRadius: 3,
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.48)",
            padding: isSm ? "32px 16px" : "40px 36px",
            width: "100%",
            maxWidth: 400,
            minWidth: isSm ? "90vw" : 370,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant={isSm ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              color: "#21ffd6",
              letterSpacing: 1,
              mb: 3,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Register
          </Typography>

          {/* Full Name */}
          <TextField
            fullWidth
            autoComplete="off"
            required
            variant="outlined"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutline sx={{ color: "#21ffd6" }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "#182442",
                borderRadius: 1.1,
                borderColor: "#21ffd6",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#21ffd6",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00ffab",
                },
                "& input": { color: "#fff" },
              },
            }}
            sx={{ mb: 2 }}
          />

          {/* Email */}
          <TextField
            fullWidth
            autoComplete="off"
            required
            variant="outlined"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlined sx={{ color: "#21ffd6" }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "#182442",
                borderRadius: 1.1,
                borderColor: "#21ffd6",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#21ffd6",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00ffab",
                },
                "& input": { color: "#fff" },
              },
            }}
            sx={{ mb: 2 }}
          />

          {/* Phone */}
          <TextField
            fullWidth
            autoComplete="off"
            variant="outlined"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon sx={{ color: "#21ffd6" }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: "#182442",
                borderRadius: 1.1,
                borderColor: "#21ffd6",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#21ffd6",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00ffab",
                },
                "& input": { color: "#fff" },
              },
            }}
            sx={{ mb: 2 }}
          />

          {/* Password */}
          <TextField
            fullWidth
            autoComplete="off"
            required
            variant="outlined"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlined sx={{ color: "#21ffd6" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                    tabIndex={-1}
                    sx={{ color: "#21ffd6" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                bgcolor: "#182442",
                borderRadius: 1.1,
                borderColor: "#21ffd6",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#21ffd6",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00ffab",
                },
                "& input": { color: "#fff" },
              },
            }}
            sx={{ mb: 2 }}
          />

          {/* Register Button */}
          <Button
            fullWidth
            disabled={loading}
            type="submit"
            sx={{
              mt: 1,
              fontWeight: 700,
              borderRadius: 1.2,
              fontSize: 17,
              bgcolor: "#21ffd6",
              color: "#0f162b",
              boxShadow: "0 2px 12px #21ffd688",
              textTransform: "uppercase",
              mb: 2,
              py: 1.2,
              letterSpacing: 1,
              "&:hover": {
                bgcolor: "#00ffc0",
              },
            }}
            onClick={handleSubmit}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          {/* Social Login */}
          <Button
            startIcon={<GoogleIcon sx={{ color: "#fff" }} />}
            fullWidth
            sx={{
              background: "#17213c",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 1.2,
              fontSize: 16,
              mb: 1,
              "&:hover": { background: "#122035" },
            }}
            // onClick={() => doGoogleRegister()}
          >
            Continue with Google
          </Button>
          <Button
            startIcon={<PhoneIcon sx={{ color: "#21ffd6" }} />}
            fullWidth
            sx={{
              background: "#17213c",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 1.2,
              fontSize: 16,
              mb: 2,
              "&:hover": { background: "#122035" },
            }}
            // onClick={() => doPhoneRegister()}
          >
            Login with Phone Number
          </Button>

          <Divider sx={{ mb: 2, borderColor: "#1b3137" }} />

          <Typography
            variant="body2"
            sx={{
              color: "#94ffe6",
              mt: 0.5,
              fontSize: 15,
              mb: 0.5,
              textAlign: "center",
            }}
          >
            Already a member?{" "}
            <Link
              to="/login"
              style={{
                color: "#21ffd6",
                textDecoration: "underline",
                fontWeight: 700,
              }}
            >
              Sign In
            </Link>
          </Typography>

          <Typography
            sx={{
              fontSize: "11px",
              color: "#80ffd1",
              letterSpacing: ".07em",
              mt: 2,
              textAlign: "center",
            }}
          >
            © {currentYear}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Register;
