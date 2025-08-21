import React from "react";
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
const Home = () => {
  return (
    <>
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="features">
        <FeatureAnalyticsSection />
      </div>
      <div id="about-page">
        <AboutPage />
      </div>
      <div id="how-it-works">
        <HowItWorksPage />
      </div>
      {/* <div id="pricing">
        <WorldAnalyticsHero />
      </div> */}
      {/* <div id="how-it-works">
        <TrustSection />
      </div> */}

      {/* <div id="testimonials">
        <TestimonialSection />
      </div> */}

      <div id="contact">
        <Contact />
      </div>
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
