import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  Google as GoogleIcon,
  PhoneIphone as PhoneIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { login, clearErrors } from "../redux/slices/userSlice";

import axios from "../axiosInstance";

const Login = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector((s) => s.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((p) => !p);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("/api/status");
      if (!data?.data) {
        return message.error("Server unreachable. Try again later.");
      }
    } catch {
      return message.error("Server unreachable. Try again later.");
    }
    dispatch(clearErrors());
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        message.success("Login successful!");
        navigate("/select-mode");
      })
      .catch((errMsg) => {
        message.error(errMsg);
      });
  };

  return (
    <>
      {/* Full-viewport background */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          bgcolor: "#091021",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Centered card */}
        <Container
          maxWidth="xs"
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            zIndex: 1,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              bgcolor: "#0F1A2B",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
              p: isSm ? 3 : 5,
              m: 2,
              textAlign: "center",
              maxWidth: 410,
            }}
          >
            <Avatar
              sx={{
                mb: 2,
                bgcolor: "transparent",
                width: 64,
                height: 64,
                mx: "auto",
              }}
            >
              <Box
                component="img"
                src="/logo.png"
                alt="Bizbridge Logo"
                sx={{ width: "100%", height: "100%" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </Avatar>
            <Typography
              variant={isSm ? "h5" : "h4"}
              sx={{
                fontWeight: 700,
                color: "#33FFD1",
                letterSpacing: 1,
                mb: 0.3,
              }}
            >
              WELCOME TO{" "}
              <Box component="span" color="#00FFAB">
                BIZBRIDGE
              </Box>
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#CFCFCF", mb: 3, mt: 0.5 }}
            >
              Connecting Businesses, Empowering Growth
            </Typography>

            <TextField
              fullWidth
              required
              autoComplete="off"
              variant="outlined"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: "#33FFD1" }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "#152340",
                  borderRadius: 1.5,
                  borderColor: "#33FFD1",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1bd2ca",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00FFAB",
                  },
                  "& input": { color: "#fff" },
                },
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              required
              autoComplete="off"
              variant="outlined"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ color: "#33FFD1" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePassword}
                      edge="end"
                      tabIndex={-1}
                      sx={{ color: "#33FFD1" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "#152340",
                  borderRadius: 1.5,
                  borderColor: "#33FFD1",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1bd2ca",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00FFAB",
                  },
                  "& input": { color: "#fff" },
                },
              }}
              sx={{ mb: 0.5 }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                component={RouterLink}
                to="/forgot-password"
                sx={{
                  color: "#80ffe6",
                  textTransform: "none",
                  fontSize: 14,
                  px: 0,
                }}
              >
                Forgot Password?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mb: 2,
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: 17,
                borderRadius: 2,
                px: 0,
                color: "#0e141e",
                background: "linear-gradient(90deg, #00FFAB 30%, #33FFD1 100%)",
                boxShadow: "0 2px 8px #00ffab44",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #00e2a0 30%, #13ccb7 100%)",
                },
              }}
            >
              {loading ? (
                <IconButton disabled>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      border: "3px solid #0e141e",
                      borderTop: "3px solid #33FFD1",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      "@keyframes spin": {
                        to: { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                </IconButton>
              ) : (
                "Login"
              )}
            </Button>

            <Button
              fullWidth
              startIcon={<GoogleIcon sx={{ color: "#fff" }} />}
              sx={{
                background: "#202944",
                color: "#fff",
                mb: 1.5,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                "&:hover": { background: "#143642" },
              }}
              // onClick={() => doGoogleLogin()}
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              startIcon={<PhoneIcon sx={{ color: "#33FFD1" }} />}
              sx={{
                background: "#202944",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                mb: 2,
                "&:hover": { background: "#143642" },
              }}
              // onClick={() => doPhoneLogin()}
            >
              Login with Phone Number
            </Button>

            <Divider sx={{ mt: 2, mb: 1, borderColor: "#1b3137" }} />

            <Typography variant="body2" sx={{ color: "#fff", mt: 0.5 }}>
              Don&apos;t have an account?{" "}
              <Button
                component={RouterLink}
                to="/register"
                sx={{
                  color: "#00FFAB",
                  textTransform: "none",
                  fontWeight: 700,
                  p: 0,
                  fontSize: 15,
                  background: "none",
                  "&:hover": {
                    background: "none",
                    textDecoration: "underline",
                  },
                }}
              >
                Sign up
              </Button>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Login;
