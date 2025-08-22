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
    highlighted: true,
  },
];

export default function PricingPlans() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Navbar />
      <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 4, sm: 5, md: 7, lg: 9 },
            py: { xs: 4, md: 8 },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.5rem" },
                mb: 2,
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
            {PLANS.map((plan) => (
              <Grid item xs={12} sm={6} md={4} key={plan.title}>
                <Paper
                  elevation={plan.highlighted ? 6 : 2}
                  sx={{
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    textAlign: "center",
                    border: plan.highlighted
                      ? `2px solid #2054a3`
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
                        bgcolor: "#2054a3",
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
                      color: "#2054a3",
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
                            color: "#2054a3",
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
                        bgcolor: "#2054a3",
                        color: "#fff",
                        "&:hover": { bgcolor: "#2054a3" },
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
