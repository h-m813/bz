import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Breadcrumbs,
  Link as MUILink,
  TextField,
  Button,
} from "@mui/material";
import Mail from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { message as antdMessage } from "antd";
import {
  forgotPassword,
  verifyOtp,
  clearErrors,
} from "../redux/slices/userSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, message, resetPasswordToken } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  // 🟢 Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

const handleVerifyOtp = async () => {
  dispatch(verifyOtp({ email, otp })).then((res) => {
    const token = res?.payload?.resetPasswordToken;

    if (res.payload?.success && token) {
      localStorage.setItem("resetPasswordToken", token);

      navigate("/password/reset", {
        state: { resetPasswordToken: token },
      });
    }
  });
};



  useEffect(() => {
    if (error) {
      antdMessage.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      antdMessage.success(message);
      setShowOtpField(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, error, message]);

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <PageTitle
        title="Forgot Password - Bizbridge"
        description="Forgot your password? Enter your email to receive a reset link."
      />
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <MUILink
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none" }}
        >
          Home
        </MUILink>
        <Typography sx={{ color: "primary.main" }}>
          Forgot Password
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "primary.white",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          className="form_style border-style"
          sx={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
            <Mail />
          </Avatar>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#333",
              letterSpacing: "2.5px",
              lineHeight: 1.8,
            }}
          >
            Forgot your password?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#555",
              letterSpacing: "1.5px",
              lineHeight: 1.8,
              fontSize: "16px",
            }}
          >
            Don't fret! Just type in your email and we will send you a code to
            reset your password!
          </Typography>

          <TextField
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              mt: 2,
              "& .MuiInputBase-root": { color: "text.secondary" },
              fieldset: { borderColor: "rgb(231, 235, 240)" },
            }}
          />

          <Button
            disabled={loading}
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            className="courses_desc"
            sx={{
              borderRadius: "5px",
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: ".1rem",
              color: "white",
              mb: showOtpField ? 2 : 0,
            }}
          >
            {loading ? "Loading..." : "Send Email"}
          </Button>

          {/* ✅ OTP FIELD */}
          {showOtpField && (
            <>
              <TextField
                fullWidth
                id="otp"
                label="Enter OTP"
                name="otp"
                placeholder="6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{
                  mt: 2,
                  mb: 2,
                  "& .MuiInputBase-root": { color: "text.secondary" },
                  fieldset: { borderColor: "rgb(231, 235, 240)" },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={handleVerifyOtp}
                sx={{
                  borderRadius: "5px",
                  textTransform: "none",
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: ".1rem",
                  color: "white",
                }}
              >
                Verify OTP
              </Button>
            </>
          )}

          <Box
            variant="h6"
            align="center"
            gutterBottom
            sx={{
              pt: 2,
              fontFamily: "Poppins, sans-serif",
              color: "#555",
              letterSpacing: "1.5px",
              lineHeight: 1.8,
              fontSize: "16px",
            }}
            className="switchMember"
          >
            Already a member? <Link to="/login">Sign In</Link>
            <hr style={{ marginTop: "20px" }} />
            <p
              style={{
                marginTop: "20px",
                fontSize: "12px",
                letterSpacing: ".1rem",
                lineHeight: "1.5rem",
                marginBottom: "-20px",
              }}
            >
              &copy; {currentYear} Copyright by Bizbridge. All rights reserved.
            </p>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ForgotPassword;
