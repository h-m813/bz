import React from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import networkImg from "../Images/connectnode.png"; // <-- Put your screenshot image at this path

const Hero = () => (
  <Box
    sx={{
      width: "100%",
      minHeight: "100vh",
      minHeight: { xs: 620, sm: 780, md: 680 },
      display: "flex",
      alignItems: "center",
      bgcolor: "transparent",
      py: { xs: 8, md: 0 },
      background: "radial-gradient(circle at 5% 40%, #2054a3 0%, #2054a3 100%)",
      overflow: "hidden",
      position: "relative",
    }}
  >
    <Container maxWidth="lg" sx={{ zIndex: 2 }}>
      <Grid
        container
        spacing={{ xs: 0, sm: 6, md: 4, lg: 8 }}
        alignItems="center"
        justifyContent="space-between"
        direction={{ xs: "column-reverse", md: "row" }}
      >
        {/* Left: Headline + Sub + Button */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: 520, sm: 600 },
              px: { xs: 2, sm: 2 },
              mx: { xs: "auto", md: 0 },
              mb: { xs: 4, md: 0 },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.15rem", sm: "2.7rem", md: "3.07rem" },
                lineHeight: 1.09,
                mb: 3,
                color: "#fff",
                textAlign: { xs: "center", md: "left" },
                letterSpacing: "-.5px",
              }}
            >
              Bridge the Gap
              <br />
              Between{" "}
              <Box component="span" sx={{ color: "#FFD600", fontWeight: 900 }}>
                Business&nbsp;& Technology
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.92)",
                fontSize: { xs: "1.07rem", sm: "1.15rem", md: "1.18rem" },
                mb: 4,
                maxWidth: { xs: 480, md: 470 },
                textAlign: { xs: "center", md: "left" },
                mx: { xs: "auto", md: 0 },
                lineHeight: 1.65,
              }}
            >
              Streamline your business operations with our powerful SaaS
              platform. Connect, automate, and scale your business processes
              with intelligent solutions designed for modern enterprises.
            </Typography>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Button
                variant="contained"
                sx={{
                  background: "#FFD600",
                  color: "#222",
                  fontWeight: 700,
                  fontSize: "1.09rem",
                  px: 4,
                  py: 1.4,
                  borderRadius: "11px",
                  textTransform: "none",
                  letterSpacing: "0.12em",
                  boxShadow: "none",
                  "&:hover": {
                    background: "#FFEB39",
                    color: "#181818",
                  },
                }}
                href="#"
              >
                Get Started Free
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* Right: Network Illustration */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" },
            mb: { xs: 4, md: 0 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: 340, sm: 420, md: 470, lg: 560 },
              boxShadow: "0 16px 50px 0 rgba(88,65,161,0.27)",
              borderRadius: "28px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={networkImg}
              alt="Digital network mesh illustration"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: 28,
                background: "rgba(19,16,34,0.11)",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Hero;
