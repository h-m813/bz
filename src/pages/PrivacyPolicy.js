import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import Navbar from "../Components/Navbar"; // adjust path if needed
import Footer from "../pages/Footer"; // adjust path if needed
import HeaderSection from "../pages/HeaderSection"; // adjust path as needed
import ScrollToTop from "../Components/ScrollToTop"; // adjust path if needed
const PrivacyPolicy = () => {
  // Data to pass as props to HeaderSection
  const imageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
  const titleText = "Bizbridge";
  const descriptionText =
    "At BizBridge, we  your privacy and are committed to protecting the personal and business information you entrust to us. This Privacy Policy explains how we collect, use, and safeguard your data to ensure a secure and transparent experience while using our platform.";

  return (
    <>
      <ScrollToTop />
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
          {/* Page Title */}
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
            BizBridge - Privacy Policy
          </Typography>

          {/* Privacy content */}
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            At BizBridge, we value your privacy and are committed to protecting
            the personal and business information you share with us. This
            Privacy Policy explains how we collect, use, and safeguard your data
            when you use our platform and services.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            1. Information We Collect
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We may collect personal information such as your name, email
            address, company details, contact information, payment details, and
            any other data you choose to provide. We also collect non-personal
            data such as browser type, IP address, and usage statistics for
            analytics purposes.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We use your information to operate, improve, and personalize our
            services, facilitate business connections, process transactions,
            send important updates, and comply with legal obligations.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            3. Sharing of Information
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We do not sell your personal information. We may share your data
            with trusted partners, service providers, or as required by law, but
            only to the extent necessary to fulfill our services or comply with
            regulations.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            4. Data Security
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We implement industry-standard security measures to protect your
            data against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet is
            100% secure.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            5. Cookies and Tracking Technologies
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            BizBridge uses cookies and similar technologies to improve user
            experience, analyze site usage, and personalize content. You can
            control cookies through your browser settings.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            6. Your Rights
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            Depending on your location, you may have the right to access,
            update, delete, or restrict the use of your data. To exercise these
            rights, contact us at the email provided below.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{ mt: 4, textAlign: "left", fontWeight: "bold" }}
          >
            7. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "left" }}>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated date.
          </Typography>

          <Typography variant="body1" sx={{ mt: 4, textAlign: "left" }}>
            If you have any questions or concerns about this Privacy Policy,
            contact us at: <strong>support@bizbridge.com</strong>
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default PrivacyPolicy;
