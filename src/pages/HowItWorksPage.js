import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Navbar from "../Components/Navbar";
import Footer from "../pages/Footer";
const steps = [
  {
    number: "1",
    icon: <PersonAddAlt1Icon sx={{ color: "#26518c", fontSize: 34 }} />,
    iconBg: "#e6f0ff",
    circleColor: "#26518c",
    title: "Sign Up",
    desc: "Create your account in minutes. No credit card required for the free trial. Start exploring immediately.",
  },
  {
    number: "2",
    icon: <SettingsIcon sx={{ color: "#26518c", fontSize: 34 }} />,
    iconBg: "#edeafb",
    circleColor: "#26518c",
    title: "Configure",
    desc: "Set up your integrations and customize your workspace. Our guided setup wizard makes it effortless.",
  },
  {
    number: "3",
    icon: <NotificationsActiveIcon sx={{ color: "#19b768", fontSize: 34 }} />,
    iconBg: "#dbf8eb",
    circleColor: "#19b768",
    title: "Launch",
    desc: "Go live with your optimized business processes. Watch your productivity soar with automated workflows.",
  },
];

export default function HowItWorksPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box
        sx={{
          background: "#f9fbfd",
          minHeight: "100vh",
          width: "100%",
          py: { xs: 5, md: 10 },
          px: { xs: 1, sm: 3 },
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            textAlign: "center",
            mb: { xs: 5, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: "#1a2330",
              fontSize: { xs: 28, sm: 32, md: 36 },
              letterSpacing: 0.3,
            }}
          >
            How It Works
          </Typography>
          <Typography
            sx={{
              maxWidth: 660,
              color: "#415064",
              mx: "auto",
              fontSize: { xs: 16, sm: 18 },
            }}
          >
            Get started with BizBridge in three simple steps and transform your
            business operations today.
          </Typography>
        </Box>

        <Grid
          container
          spacing={isMobile ? 5 : 6}
          justifyContent="center"
          alignItems="flex-start"
        >
          {steps.map((step, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Box sx={{ textAlign: "center" }}>
                {/* Numbered Circle */}
                <Box
                  sx={{
                    width: 68,
                    height: 68,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: step.circleColor,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 32,
                    mx: "auto",
                    boxShadow: "0 2px 12px 0 rgba(60,80,140,0.07)",
                  }}
                >
                  {step.number}
                </Box>
                {/* Icon */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    mt: 2,
                    mb: 2.5,
                    mx: "auto",
                    borderRadius: 2,
                    background: step.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {step.icon}
                </Box>

                {/* Step Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    mt: 1,
                    color: "#1a2330",
                    fontSize: 20,
                  }}
                >
                  {step.title}
                </Typography>
                {/* Description */}
                <Typography
                  sx={{
                    color: "#40495e",
                    mt: 1,
                    px: { xs: 0, md: 2 },
                    fontSize: 16,
                  }}
                >
                  {step.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
