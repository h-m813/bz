import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  useTheme,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import Navbar from "../Components/Navbar";
import Footer from "../pages/Footer";
// Feature card data:
const features = [
  {
    icon: <LinkIcon sx={{ color: "#fff", fontSize: 30 }} />,
    iconBg: "#2054a3",
    title: "Smart Integration",
    desc: "Seamlessly connect all your business tools and platforms with our intelligent integration system. No more data silos or manual processes.",
  },
  {
    icon: <ShowChartIcon sx={{ color: "#fff", fontSize: 30 }} />,
    iconBg: "#2054a3",
    title: "Real-Time Insights",
    desc: "Get instant visibility into your business performance with advanced analytics and customizable dashboards that update in real-time.",
  },
  {
    icon: <DashboardCustomizeIcon sx={{ color: "#fff", fontSize: 30 }} />,
    iconBg: "#FFD600",
    title: "Custom Dashboards",
    desc: "Build personalized dashboards tailored to your specific needs. Drag-and-drop interface makes customization simple and intuitive.",
  },
];

// Main component
const FeatureAnalyticsSection = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box
        sx={{
          bgcolor: "#f8fafc",
          py: { xs: 7, md: 10 },
          px: { xs: 2, md: 0 }, // Added horizontal padding for mobile
          width: "100%", // ✅ Removed 100vw (fixed overflow)
          overflowX: "hidden",
        }}
      >
        <Container maxWidth="lg">
          {/* Title + subtitle */}
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 6, md: 8 },
              px: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                color: "#101828",
                lineHeight: 1.2,
                mb: 1.2,
              }}
            >
              Powerful Features for Modern Business
            </Typography>
            <Typography
              sx={{
                color: "#667085",
                fontWeight: 500,
                fontSize: { xs: "1rem", md: "1.13rem" },
                maxWidth: 540,
                mx: "auto",
              }}
            >
              Discover how BizBridge transforms your business operations with
              cutting-edge technology and intelligent automation.
            </Typography>
          </Box>

          {/* Features Horizontal Cards */}
          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            justifyContent="center"
            alignItems="stretch"
          >
            {features.map((feature, idx) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Paper
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    p: { xs: 3, sm: 4 },
                    bgcolor: "#fff",
                    boxShadow:
                      "0 4px 18px 0 rgba(80,80,100,0.08), 0 1.5px 8px 0 rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    minHeight: { xs: "auto", sm: 190 },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: feature.iconBg,
                      borderRadius: 2,
                      width: 46,
                      height: 46,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2.5,
                      boxShadow:
                        idx === 2
                          ? "0 2px 12px 0 rgba(255,214,0,0.16)"
                          : "0 2px 12px 0 rgba(39,83,230,0.11)",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                      color: "#101828",
                      mb: 1.6,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#56616b",
                      fontWeight: 500,
                      fontSize: { xs: "0.95rem", md: "1.07rem" },
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default FeatureAnalyticsSection;
