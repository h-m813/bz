import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../redux/slices/contactFormSlice";

const ContactForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const { name, email, message } = useSelector((state) => state.contactForm);

  const handleChange = (e) => {
    dispatch(updateField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add API submission here if needed
    dispatch(resetForm());
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        bgcolor: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 10 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={7.5} lg={6.5}>
          {/* Title & Subtitle */}
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              textAlign: "center",
              mb: 1,
              color: "#111827",
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              textAlign: "center",
              mb: 5,
              maxWidth: 520,
              mx: "auto",
              fontSize: isMobile ? "1rem" : "1.1rem",
            }}
          >
            Ready to transform your business? Contact us today and let's discuss
            how BizBridge can help you achieve your goals.
          </Typography>
          {/* Contact Form */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              px: { xs: 2, sm: 4 },
              py: { xs: 3, sm: 4 },
              maxWidth: 600,
              mx: "auto",
              boxShadow: "0 2px 12px #e5e7eb",
            }}
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    fullWidth
                    size="medium"
                    variant="outlined"
                    value={name}
                    onChange={handleChange}
                    sx={{ bgcolor: "#fff" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    fullWidth
                    size="medium"
                    variant="outlined"
                    value={email}
                    onChange={handleChange}
                    sx={{ bgcolor: "#fff" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    name="message"
                    placeholder="Tell us about your business needs"
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={10}
                    variant="outlined"
                    value={message}
                    onChange={handleChange}
                    sx={{ bgcolor: "#fff" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      fontWeight: 600,
                      bgcolor: "#174ea6",
                      color: "#fff",
                      py: 1.4,
                      borderRadius: 2,
                      fontSize: "1.09rem",
                      boxShadow: "none",
                      "&:hover": { bgcolor: "#123c7a" },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
