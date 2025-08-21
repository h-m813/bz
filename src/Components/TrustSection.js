// components/PricingPlans.jsx

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Navbar from "../Components/Navbar";
import Footer from "../pages/Footer";
import HeaderSection from "../pages/HeaderSection";

const PLANS = [
  {
    title: "Free",
    price: "₹0",
    per: "per month",
    features: [
      "Up to 5 integrations",
      "Basic analytics",
      "Email support",
      "1 custom dashboard",
    ],
    button: "Get Started",
    buttonVariant: "outlined",
    highlighted: false,
  },
  {
    title: "Pro",
    price: "₹1000",
    per: "per month",
    features: [
      "Unlimited integrations",
      "Advanced analytics",
      "Priority support",
      "Unlimited dashboards",
      "API access",
    ],
    button: "Start Pro Trial",
    buttonVariant: "contained",
    highlighted: true, // This marks the "Most Popular" plan
  },
];

export default function PricingPlans() {
  const imageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
  const titleText = "Bizbridge";
  const descriptionText =
    "At BizBridge, we  your privacy and are committed to protecting the personal and business information you entrust to us. This Privacy Policy explains how we collect, use, and safeguard your data to ensure a secure and transparent experience while using our platform.";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <HeaderSection
          image={imageUrl}
          title={titleText}
          description={descriptionText}
        />
      </Box>
      <Box sx={{ backgroundColor: "#f5f7fa", height: "auto" }}>
        <Box
          sx={{
            // py: { xs: 5, md: 8 },
            // px: { xs: 2, md: 0 },
            mr: { xs: 2, md: 3 },
            ml: { xs: 2, md: 3 },
            pb: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              maxWidth: 1080,
              mx: "auto",
              textAlign: "center",
              mb: 6,
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              mb={1}
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.5rem" },
                pt: { xs: 6, md: 10 },
                pb: { xs: 2, md: 4 },
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 520,
                mx: "auto",
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Choose the perfect plan for your business needs. Start free and
              scale as you grow.
            </Typography>
          </Box>
          <Grid container spacing={isMobile ? 3 : 4} justifyContent="center">
            {PLANS.map((plan, idx) => (
              <Grid item xs={12} sm={6} md={4} key={plan.title}>
                <Paper
                  elevation={plan.highlighted ? 6 : 2}
                  sx={{
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    textAlign: "center",
                    border: plan.highlighted
                      ? `2px solid #1763ed`
                      : "1px solid #e8eaf1",
                    position: "relative",
                    background: plan.highlighted ? "#fff" : "#fafbfc",
                    mb: plan.highlighted && !isMobile ? 0 : 2,
                    minHeight: { md: 480 },
                  }}
                >
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -24,
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: "#1763ed",
                        color: "#fff",
                        px: 2,
                        py: 0.7,
                        borderRadius: "14px",
                        fontWeight: 700,
                        fontSize: 14,
                        boxShadow: "0px 4px 12px rgba(24, 100, 240, 0.11)",
                      }}
                    >
                      Most Popular
                    </Box>
                  )}
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mb: 1, color: "#232346" }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    component="div"
                    sx={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: "#1763ed",
                      mb: 0.2,
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography color="text.secondary" mb={2}>
                    {plan.per}
                  </Typography>
                  <Stack
                    spacing={1.2}
                    mb={3}
                    component="ul"
                    sx={{ px: 0, listStyle: "none" }}
                  >
                    {plan.features.map((f) => (
                      <Typography
                        component="li"
                        key={f}
                        sx={{
                          fontSize: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#232346",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 20,
                            height: 20,
                            bgcolor: "#e7edfc",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            mr: 1,
                            color: "#1763ed",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </Box>
                        {f}
                      </Typography>
                    ))}
                  </Stack>
                  <Button
                    fullWidth
                    variant={plan.buttonVariant}
                    size="large"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      py: 1.1,
                      ...(plan.highlighted && {
                        bgcolor: "#1763ed",
                        color: "#fff",
                        "&:hover": { bgcolor: "#1250cb" },
                      }),
                    }}
                  >
                    {plan.button}
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
