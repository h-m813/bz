import React from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Footer from "../pages/Footer";
import Navbar from "../Components/Navbar";
import ContactImg from "../Images/contactimg.png"; // Ensure this path is correct

export default function ContactPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Constants for styling
  const ACCENT = "#5074f0";
  const TEXT = "#22374a";
  const SUBTEXT = "#4a5870";
  const CARD_BG = "#fff";
  const contentMaxWidth = "1280px";
  const navbarHeight = 64; // Adjust if your navbar height is different

  // Contact cards data
  const contactCards = [
    {
      icon: <LocationOnIcon sx={{ color: ACCENT, fontSize: 28, mr: 1 }} />,
      title: "Our Office",
      details: (
        <>
          Bhamashah Tecno Hub
          <br />
          Jhalana Marg,Malviya Nagar,
          <br />
          Jaipur (Raj), India
        </>
      ),
    },
    {
      icon: <PhoneIcon sx={{ color: ACCENT, fontSize: 28, mr: 1 }} />,
      title: "Contact",
      details: (
        <>
          <span style={{ color: SUBTEXT, fontWeight: 600 }}>Phone: </span>
          <span style={{ color: ACCENT, fontWeight: 600 }}>+91-8302044892</span>
          <br />
          <span style={{ color: SUBTEXT, fontWeight: 600 }}>Phone </span>
          <span style={{ color: ACCENT, fontWeight: 600 }}>+91-8302044892</span>
          <br />
          <span style={{ color: SUBTEXT, fontWeight: 600 }}>Email: </span>
          <a
            href="mailto:contact@gatiktech.com"
            style={{ color: ACCENT, fontWeight: 600, textDecoration: "none" }}
          >
            contact@bizbridgetech.com
          </a>
        </>
      ),
    },
    {
      icon: <AccessTimeIcon sx={{ color: ACCENT, fontSize: 28, mr: 1 }} />,
      title: "Customer Support",
      details: (
        <>
          <span style={{ color: SUBTEXT, fontWeight: 600 }}>24/7 Help: </span>
          <span style={{ color: SUBTEXT, fontWeight: 400 }}>
            Chat &amp; Email support
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <Box
        sx={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              mx: "auto",
              maxWidth: contentMaxWidth,
              px: { xs: 1, sm: 2 },
              py: { xs: 3, md: 5 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Header */}
            <Typography
              sx={{
                color: ACCENT,
                fontWeight: "bold",
                fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
                mb: 3,
              }}
            >
              Get in Touch with Us
            </Typography>
            <Divider
              sx={{
                width: 90,
                height: 4,
                bgcolor: ACCENT,
                borderRadius: 3,
                mb: 6,
                mx: "auto",
              }}
            />

            {/* Contact Cards */}
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
              {contactCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    elevation={3}
                    sx={{
                      borderRadius: 3,
                      padding: 3,
                      height: 180,
                      textAlign: "left",
                      boxShadow: `0 0 20px -5px ${ACCENT}`,
                      "&:hover": {
                        boxShadow: `0 0 35px 0px ${ACCENT}`,
                        transform: "translateY(-5px)",
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {card.icon}
                      <Typography
                        variant="h6"
                        sx={{ color: ACCENT, fontWeight: 700 }}
                      >
                        {card.title}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "#333", fontSize: "1rem" }}>
                      {card.details}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Main Content */}
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
              sx={{ mb: 10 }}
            >
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    boxShadow: "-18px 20px 20px -8px #5074f0",
                    height: { xs: 300, md: 450 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={ContactImg}
                    alt="Contact"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>

              {/* Form Section */}
              <Grid item xs={12} md={6}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 5,
                    backgroundColor: CARD_BG,
                    padding: { xs: 3, md: 5 },
                    height: { xs: "auto", md: 600 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: ACCENT, mb: 4, fontWeight: 700 }}
                  >
                    Send a Message
                  </Typography>
                  <form>
                    <TextField
                      fullWidth
                      label="Your Name"
                      required
                      sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 2 }}
                      InputLabelProps={{
                        style: { color: ACCENT, fontWeight: 700 },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      required
                      sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 2 }}
                      InputLabelProps={{
                        style: { color: ACCENT, fontWeight: 700 },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Email Address"
                      required
                      sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 2 }}
                      InputLabelProps={{
                        style: { color: ACCENT, fontWeight: 700 },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Your Message"
                      required
                      multiline
                      rows={4}
                      sx={{ mb: 4, backgroundColor: "#fff", borderRadius: 2 }}
                      InputLabelProps={{
                        style: { color: ACCENT, fontWeight: 700 },
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: ACCENT,
                        color: "#fff",
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: "1.125rem",
                        borderRadius: 3,
                        "&:hover": { backgroundColor: "#335ac4" },
                      }}
                    >
                      SEND MESSAGE
                    </Button>
                  </form>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
