import GlobalLayout from "./components/GlobalLayout";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { reloadUser } from "../redux/slices/userSlice";
import store from "../redux/store";
import ScrollToTop from "./ScrollToTop";
import ConnectionStatus from "./ConnectionStatus";

// Import all pages used in navbar.js
import Home from "../pages/Home";
import About from "./About";
import ContactPage from "../pages/ContactPage";
import FeatureAnalyticsSection from "../pages/FeatureAnalyticsSection";
import TestimonialSection from "./TestimonialSection";
import HowItWorksPage from "../pages/HowItWorksPage";
import NotFound from "../pages/Error";

// Seller routes (example)
import SellerLayout from "../pages/Seller/Navbar1";
import BuyerNetwork from "../pages/Seller/BuyerNetwork";

function AppContent() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(reloadUser());
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <ConnectionStatus />
      <GlobalLayout>
        {/* Wrap all routes inside global layout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-page" element={<ContactPage />} />
          <Route
            path="/feature-analytics"
            element={<FeatureAnalyticsSection />}
          />
          <Route path="/testimonials" element={<TestimonialSection />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          {/* Seller routes */}
          <Route path="/BuyerNetwork" element={<SellerLayout />}>
            <Route index element={<BuyerNetwork />} />
          </Route>
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalLayout>
    </>
  );
}

export default AppContent;
