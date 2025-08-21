import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../pages/Footer";
import HeaderSection from "../pages/HeaderSection";

const TermsOfService = () => {
  const imageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
  const titleText = "Bizbridge";
  const descriptionText =
    "At BizBridge, we  your privacy and are committed to protecting the personal and business information you entrust to us. This Privacy Policy explains how we collect, use, and safeguard your data to ensure a secure and transparent experience while using our platform.";

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
      <Box
        sx={{
          py: 4,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
            boxShadow: "none",
            borderRadius: 0,
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "left",
              fontSize: { xs: "2rem", md: "2.5rem" },
              mb: 3,
            }}
          >
            BizBridge - Terms of Service
          </Typography>

          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            Welcome to BizBridge. These Terms of Service ("Terms") govern your
            use of our B2B platform, services, and products.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            By using BizBridge, you agree to comply with these Terms. If you do
            not agree, please do not use our services.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            2. Services Provided
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            BizBridge connects businesses for trade, collaboration, and
            networking. We reserve the right to modify or discontinue services
            at any time.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            3. User Responsibilities
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            You are responsible for all activities under your account, ensuring
            provided information is accurate and lawful.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            4. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            All content, logos, and trademarks remain the property of BizBridge
            unless otherwise stated.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            5. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            BizBridge is not liable for business losses, data breaches, or
            outcomes from business transactions made through the platform.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            6. Termination
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We may suspend or terminate your account if you violate these Terms.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            7. Governing Law
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            These Terms are governed by the laws of [Your Country/State].
          </Typography>

          <Typography variant="body1" sx={{ mt: 4, textAlign: "left" }}>
            For questions, contact us at: <strong>support@bizbridge.com</strong>
          </Typography>
        </Paper>
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default TermsOfService;
