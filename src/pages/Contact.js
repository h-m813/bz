import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../redux/slices/contactFormSlice";
import axios from "axios";
import CONTACT_BG_IMAGE from "../Images/contact.png"; // <-- Update this path as needed

const ContactForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { name, email, phone, message } = useSelector(
    (state) => state.contactForm
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://bizbridgetech.onrender.com/api/v1/contact/create",
        {
          name,
          email,
          phone,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Your message has been sent successfully!");
        dispatch(resetForm());
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 3, md: 8 },
        px: { xs: 0, sm: 2 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 1100,
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow: "0 4px 24px #e0e0e1",
        }}
      >
        {/* Left: Image */}
        <Box
          sx={{
            flex: 1.1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            bgcolor: "#fafafa",
          }}
        >
          <img
            src={CONTACT_BG_IMAGE}
            alt="Contact Representative"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              minHeight: "400px",
              maxHeight: "580px",
            }}
          />
        </Box>

        {/* Right: Contact Form */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#fff",
            p: { xs: 3, sm: 4, md: 6 },
            minWidth: { xs: "100%", md: 400 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 2, color: "#232f3e" }}
          >
            Send Us an Enquiry
          </Typography>

          {/* Success and Error Messages */}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="medium"
                  label="Your Name"
                  name="name"
                  placeholder="Your Name"
                  variant="outlined"
                  value={name}
                  onChange={handleChange}
                  sx={{ bgcolor: "#f7f7f9" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="medium"
                  label="Your Email (Optional)"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={handleChange}
                  sx={{ bgcolor: "#f7f7f9" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  size="medium"
                  label="Phone Number"
                  name="phone"
                  placeholder="Phone Number"
                  type="tel"
                  variant="outlined"
                  value={phone}
                  onChange={handleChange}
                  sx={{ bgcolor: "#f7f7f9" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={10}
                  label="Your Message"
                  name="message"
                  placeholder="Your Message"
                  variant="outlined"
                  value={message}
                  onChange={handleChange}
                  sx={{ bgcolor: "#f7f7f9" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    fontWeight: 700,
                    background:
                      "radial-gradient(circle at 5% 40%, #5070f4 0%, #5e36f1 100%)",
                    color: "#fff",
                    py: 1.3,
                    borderRadius: 2,
                    fontSize: "1rem",
                    boxShadow: "none",
                    mt: 1,
                    "&:hover": {
                      bgcolor:
                        "radial-gradient(circle at 5% 40%, #5070f4 0%, #5e36f1 100%)",
                    },
                  }}
                >
                  {loading ? "Sending..." : "SEND MESSAGE"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactForm;
