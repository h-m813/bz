import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  Container,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../pages/Footer";
const heroImgUrl =
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80";
// Replace this with your own Bizbridge banner if needed

export default function About() {
  const theme = useTheme();

  return (
    <>
      <box>
        <Navbar />
      </box>
      <Box component="section" sx={{ overflowX: "hidden", width: "100%" }}>
        {/* Hero Section */}

        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 360, sm: 420, md: 500 },
            backgroundImage: `url(${heroImgUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, sm: 3, md: 5 },
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(0,0,0,0.45)",
              zIndex: 1,
            }}
          />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              position: "relative",
              zIndex: 2,
              textAlign: { xs: "center", md: "left" },
              m: 0,
              width: "100%",
            }}
          >
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Typography
                variant="h3"
                component="h1"
                color="#fff"
                fontWeight={700}
                sx={{
                  fontFamily: "serif",
                  mb: 2,
                  fontSize: { xs: "1.9rem", sm: "2.4rem", md: "3rem" },
                  lineHeight: 1.3,
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body1"
                color="#fff"
                fontWeight={500}
                sx={{
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.25rem" },
                  lineHeight: 1.6,
                  letterSpacing: 0.4,
                }}
              >
                At Bizbridge, we harness the power of AI and cutting-edge
                digital strategies to make buying and selling businesses easier,
                faster, and more affordable. Since our inception, Bizbridge has
                empowered entrepreneurs and SMEs with transformative technology,
                connecting opportunities and driving business growth across
                industries.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Why Choose Bizbridge Section */}
        <Grid
          container
          justifyContent="center"
          sx={{
            py: { xs: 4, sm: 6, md: 8 },
            px: { xs: 2, sm: 4, md: 6 },
            m: 0,
            width: "100%",
          }}
        >
          <Grid item xs={12} sm={11} md={10} lg={8}>
            <Paper
              elevation={0}
              sx={{
                px: { xs: 2, sm: 4, md: 6 },
                py: { xs: 3, sm: 4, md: 5 },
                bgcolor: "background.default",
                maxWidth: "100%",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                fontWeight={700}
                sx={{
                  mb: { xs: 2, sm: 3 },
                  fontSize: { xs: "1.4rem", sm: "1.75rem", md: "2.2rem" },
                  letterSpacing: 0.8,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Why choose us?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.05rem", md: "1.14rem" },
                  lineHeight: 1.75,
                  color: theme.palette.text.secondary,
                }}
              >
                Bizbridge is dedicated to delivering expertly tailored solutions
                combining AI, cloud technologies, and data-driven marketing for
                your unique business goals. Our team specializes in:
              </Typography>

              <Box
                component="ul"
                sx={{
                  mt: 2,
                  mb: 2,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  "& li": { mb: 1.2 },
                  m: 0,
                  p: { xs: "0 0 0 1.2rem" },
                  overflowX: "hidden",
                  maxWidth: "100%",
                }}
              >
                <li>Innovative digital marketing and Web 3.0 strategies</li>
                <li>
                  Custom AI tools for automation and business transformation
                </li>
                <li>Software development, cybersecurity, and IT consulting</li>
                <li>
                  Affordable, scalable, and measurable solutions for sustainable
                  growth
                </li>
              </Box>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.05rem", md: "1.14rem" },
                  lineHeight: 1.75,
                  color: theme.palette.text.secondary,
                }}
              >
                With a customer-first mindset, we provide 24/7 support,
                unmatched personalization, and proven performance. Choose
                Bizbridge for reliable, future-ready technology and marketing —
                unlock your next level of success.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
