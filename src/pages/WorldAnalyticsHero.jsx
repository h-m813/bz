// HowItWorks.jsx

import React from "react";
import { Box, Grid, Typography, Paper, useTheme } from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

const STEPS = [
  {
    number: 1,
    title: "Sign Up",
    description:
      "Create your account in minutes. No credit card required for the free trial. Start exploring immediately.",
    icon: <PersonAddAlt1RoundedIcon sx={{ fontSize: 36, color: "#2762e5" }} />,
    circleBg: "#2762e5",
    circleColor: "#fff",
  },
  {
    number: 2,
    title: "Configure",
    description:
      "Set up your integrations and customize your workspace. Our guided setup wizard makes it effortless.",
    icon: <SettingsRoundedIcon sx={{ fontSize: 36, color: "#2762e5" }} />,
    circleBg: "#2762e5",
    circleColor: "#fff",
  },
  {
    number: 3,
    title: "Launch",
    description:
      "Go live with your optimized business processes. Watch your productivity soar with automated workflows.",
    icon: <LockOpenRoundedIcon sx={{ fontSize: 36, color: "#27c47c" }} />,
    circleBg: "#27c47c",
    circleColor: "#fff",
  },
];

export default function HowItWorks() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 0 },
        maxWidth: "1024px",
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        mb={2}
        sx={{
          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.4rem" },
          color: "#222",
        }}
      >
        How It Works
      </Typography>
      <Typography
        color="text.secondary"
        mb={6}
        sx={{
          fontSize: { xs: "1rem", sm: "1.15rem" },
          maxWidth: 500,
          mx: "auto",
        }}
      >
        Get started with BizBridge in three simple steps and transform your
        business operations today.
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {STEPS.map((step, idx) => (
          <Grid item xs={12} sm={4} key={step.number}>
            <Paper
              elevation={0}
              sx={{
                py: { xs: 4, md: 5 },
                px: { xs: 2, md: 3 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "transparent",
              }}
            >
              <Box
                sx={{
                  mb: 2.5,
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  bgcolor: idx === 2 ? "#27c47c" : "#2762e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    idx === 2
                      ? "0 4px 12px rgba(39,196,124,0.12)"
                      : "0 4px 12px rgba(39,98,229,0.09)",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 28,
                  }}
                >
                  {step.number}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>{step.icon}</Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  mb: 1,
                  fontSize: { xs: "1.1rem", sm: "1.12rem" },
                  color: "#222",
                }}
              >
                {step.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: "1rem",
                  lineHeight: 1.7,
                  maxWidth: 320,
                }}
              >
                {step.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
