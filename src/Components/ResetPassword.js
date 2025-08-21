// src/Components/ResetPassword.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../redux/slices/userSlice";
import { message } from "antd";

const ResetPassword = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ---- TOKEN: support state, queryString and localStorage ----
  const urlParams = new URLSearchParams(location.search);
  const tokenFromQuery = urlParams.get("token");
  const tokenFromState =
    location.state?.resetPasswordToken || location.state?.token || null;
  const tokenFromStorage = localStorage.getItem("resetToken");
  const [token, setToken] = useState(
    tokenFromState || tokenFromQuery || tokenFromStorage || null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("resetToken", token);
    }
  }, [token]);

  // Local state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redux state
  const { loading, error } = useSelector((state) => state.user);
  const { success } = useSelector(
    (state) => state.user.operations.passwordUpdate
  );

  // Toggle visibility handlers
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      message.error("Invalid or missing reset token.");
      return;
    }
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    myForm.set("token", token);
    dispatch(resetPassword({ passwords: myForm }));
  };

  // Redirect if no valid token (after mount)
  useEffect(() => {
    if (!token) {
      message.error(
        "Invalid or missing token. Please request a new password reset."
      );
      navigate("/forgot-password", { replace: true });
    }
  }, [token, navigate]);

  // Side effects for error/success
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      message.success("Password Updated Successfully");
      localStorage.removeItem("resetToken");
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [dispatch, error, success, navigate]);

  const currentYear = new Date().getFullYear();

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
          Reset Password
        </Typography>
        <TextField
          placeholder="New Password"
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          autoFocus
          sx={{
            mb: 3,
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#152340",
              borderRadius: 2,
              color: "#fff",
            },
            "& input": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#33FFD1" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00FFAB",
            },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  size="large"
                  sx={{ color: "#33FFD1" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="Confirm Password"
          fullWidth
          required
          type={showConfirmPassword ? "text" : "password"}
          sx={{
            mb: 4,
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              bgcolor: "#152340",
              borderRadius: 2,
              color: "#fff",
            },
            "& input": { color: "#fff" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#33FFD1" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00FFAB",
            },
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                  size="large"
                  sx={{ color: "#33FFD1" }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          {loading ? "Saving..." : "RESET PASSWORD"}
        </Button>
        <Typography
          variant="body2"
          color="#33FFD1"
          sx={{ mt: 2, opacity: 0.7 }}
        >
          &copy; {currentYear}
        </Typography>
      </Box>
    </Container>
  );
};

export default ResetPassword;
