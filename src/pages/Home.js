import React from "react";
import { Box } from "@mui/material";
import Navbar from "../Components/Navbar";
import Hero from "./Hero";
import FeatureAnalyticsSection from "../pages/FeatureAnalyticsSection";
import WorldAnalyticsHero from "./WorldAnalyticsHero";
import TrustSection from "../Components/TrustSection";
import TestimonialSection from "../Components/TestimonialSection";
import Contact from "./Contact";
import HowItWorksPage from "./HowItWorksPage";
import AboutPage from "./AboutPage";
import Footer from "../pages/Footer";
import ScrollToSectionButton from "../Components/ScrollToSectionButton";

const responsiveContainerSx = {
  maxWidth: "1280px",
  mx: "auto",
  px: { xs: 2, sm: 3, md: 5, lg: 8 },
  // Optionally, add vertical padding as needed (py)
};

const Home = () => {
  return (
    <>
      <Navbar />

      <Box id="hero">
        <Hero />
      </Box>

      <Box id="features" sx={responsiveContainerSx}>
        <FeatureAnalyticsSection />
      </Box>

      <Box id="about-page" sx={responsiveContainerSx}>
        <AboutPage />
      </Box>

      <Box id="how-it-works" sx={responsiveContainerSx}>
        <HowItWorksPage />
      </Box>

      {/* Uncomment and wrap if you want these sections with spacing */}
      {/* 
      <Box id="pricing" sx={responsiveContainerSx}>
        <WorldAnalyticsHero />
      </Box> 
      */}

      {/* 
      <Box id="trust-section" sx={responsiveContainerSx}>
        <TrustSection />
      </Box> 
      */}

      {/* 
      <Box id="testimonials" sx={responsiveContainerSx}>
        <TestimonialSection />
      </Box> 
      */}

      <Box id="contact" sx={responsiveContainerSx}>
        <Contact />
      </Box>

      <Footer />

      <ScrollToSectionButton
        targetId="hero"
        showAfter={200}
        tooltip="Go to top"
      />
    </>
  );
};

export default Home;
