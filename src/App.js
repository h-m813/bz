// src/App.js
import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { reloadUser } from "./redux/slices/userSlice";
import store from "./redux/store";

// Your page/component imports

import Home from "./pages/Home";
import Mode from "./Components/Mode";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./admin/global/Layout";
import AdminDashboard from "./admin/Dashboard";
import AdminProfile from "./admin/Profile";
import NotFound from "./pages/Error";
import ConnectionStatus from "./Components/ConnectionStatus";
import ForgotPassword from "./Components/ForgotPassword";
import VerifyOTP from "./Components/VerifyOTP";
import ResetPassword from "./Components/ResetPassword";

import DrawerAppBar from "./Components/Navbar"; // Your navbar component
import About from "./Components/About";
import Contact from "./pages/Contact";
import Team from "./Components/Team";

import FeatureAnalyticsSection from "./pages/FeatureAnalyticsSection";
import Footer from "./pages/Footer";
import WorldAnalyticsHero from "./pages/WorldAnalyticsHero";
import TrustSection from "./Components/TrustSection";
import TestimonialSection from "./Components/TestimonialSection";
import ContactPage from "./pages/ContactPage";
import Hero from "./pages/Hero";
import HowItWorksPage from "./pages/HowItWorksPage";
// import Catalog from "./pages/Seller/Catalog";
// About page import in Home page
import AboutPage from "./pages/AboutPage";

//Buyer Dashboar

import DashboardLayout from "./pages/Buyer/DashboardLayout";
import BuyerCatalog from "./pages/Buyer/Catalog";
import ChatPage from "./pages/Buyer/ChatPage";
import SettingPage from "./pages/Buyer/SettingPage";
import OffersPage from "./pages/Buyer/OffersPage";
import BuyerDashboard from "./pages/Buyer/BuyerDashboard";
import MyOrders from "./pages/Buyer/MyOrders";
import Ledger from "./pages/Buyer/Ledger";
import SupportPage from "./pages/Buyer/SupportPage";
import SellerNetwork from "./pages/Buyer/SellerNetwork";

//Seller Dashboard
import SellerDashboardLayout from "./pages/Seller/SellerDashboardLayout";
import SellerPage from "./pages/Seller/SellerPage";
import Catalog from "./pages/Seller/Catalog";
import BuyerNetwork from "./pages/Seller/BuyerNetwork";
import Order from "./pages/Seller/Order";
import LedgerPage from "./pages/Seller/LedgerPage";
import PaymentsPage from "./pages/Seller/PaymentsPage";
import SchemesAdsPage from "./pages/Seller/SchemesAdsPage";
import SellerAnalytics from "./pages/Seller/SellerAnalytics";
import SellerChat from "./pages/Seller/SellerChat";
import SellerSettings from "./pages/Seller/SellerSettings";
import SellerSupport from "./pages/Seller/SellerSupport";
import InterestTransactionCalculator from "./pages/Seller/InterestTransactionCalculator";

import Navbar2 from "./pages/Buyer/Navbar2";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HeaderSection from "./pages/HeaderSection";
import ScrollToTop from "./Components/ScrollToTop";
import SelectModePage from "./Components/SelectModePage";

// Layout wrapper for Seller pages with Navbar1
function SellerLayout() {
  return (
    <>
      <Navbar1 />
      <Outlet />
    </>
  );
}

// Layout wrapper for Buyer pages with Navbar2 (if needed)
function BuyerLayout() {
  return (
    <>
      <Navbar2 />
      <Outlet />
    </>
  );
}

// Layout for pages with Navbar and Footer
function MainLayout({ children }) {
  const imageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
  const titleText = "Bizbridge";
  const descriptionText =
    "At BizBridge, we  your privacy and are committed to protecting the personal and business information you entrust to us. This Privacy Policy explains how we collect, use, and safeguard your data to ensure a secure and transparent experience while using our platform.";
  return (
    <>
      <DrawerAppBar />
      <HeaderSection
        image={imageUrl}
        title={titleText}
        description={descriptionText}
      />
      {children}
      <Footer />
    </>
  );
}

function AppContent() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(reloadUser());
    }
  }, []);

  const AdminDashboardHDC = Layout(AdminDashboard);
  const AdminProfileHDC = Layout(AdminProfile);

  // Define paths to hide navbar if needed
  const hideNavbarPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <ConnectionStatus />
      <Routes>
        {/* Home page WITHOUT footer */}
        <Route path="/" element={<Home />} />
        {/* All other pages WITH navbar and footer */}
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/feature-analytics"
          element={
            <MainLayout>
              <FeatureAnalyticsSection />
            </MainLayout>
          }
        />
        <Route
          path="/testimonials"
          element={
            <MainLayout>
              <TestimonialSection />
            </MainLayout>
          }
        />
        <Route
          path="/contact-page"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route
          path="/trust"
          element={
            <MainLayout>
              <TrustSection />
            </MainLayout>
          }
        />
        <Route
          path="/how-it-works"
          element={
            <MainLayout>
              <HowItWorksPage />
            </MainLayout>
          }
        />
        {/* Seller routes with Navbar1 */}
        {/* <Route path="/Catalog" element={<SellerLayout />}>
          <Route index element={<Catalog />} />
        </Route> */}
        {/* Public routes outside SellerLayout */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-mode" element={<SelectModePage />} />
        <Route path="/about" element={<About />} />{" "}
        {/* <-- Only one /about route */}
        <Route path="/footer " element={<Footer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/feature-analytics"
          element={<FeatureAnalyticsSection />}
        />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/world-analytics" element={<WorldAnalyticsHero />} />
        <Route path="/trust" element={<TrustSection />} />
        <Route path="/testimonials" element={<TestimonialSection />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/header-section" element={<HeaderSection />} />
        {/* <Route path="/Buyer-Dashboard" element={<Dashboard />} /> */}
        <Route path="/buyer-dashboard" element={<DashboardLayout />}>
          <Route index element={<BuyerDashboard />} />
          <Route path="seller-network" element={<SellerNetwork />} />
          <Route path="buyer-catalog" element={<BuyerCatalog />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="ledger" element={<Ledger />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="settings" element={<SettingPage />} />
          <Route path="support" element={<SupportPage />} />
          {/* Add other nested routes here if needed */}
        </Route>
        <Route path="/seller-dashboard" element={<SellerDashboardLayout />}>
          {/* Protected dashboard route */}
          <Route index element={<SellerPage />} />

          <Route path="catalog" element={<Catalog />} />
          <Route path="buyer-network" element={<BuyerNetwork />} />
          <Route path="orders" element={<Order />} />
          <Route path="ledger" element={<LedgerPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="schemes-ads" element={<SchemesAdsPage />} />
          <Route path="analytics" element={<SellerAnalytics />} />
          <Route path="seller-chat" element={<SellerChat />} />
          <Route path="settings" element={<SellerSettings />} />
          <Route path="support" element={<SellerSupport />} />
          <Route
            path="interest-transaction-calculator"
            element={<InterestTransactionCalculator />}
          />
          {/* Add other nested routes here if needed */}
        </Route>
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              user?.role >= 1 ? (
                <AdminDashboardHDC />
              ) : (
                <Navigate to="/select-mode" replace />
              )
            ) : (
              <Login />
            )
          }
        />
        {/* Protected admin profile route */}
        {user?.role >= 1 && (
          <Route path="/admin/profile" element={<AdminProfileHDC />} />
        )}
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ProSidebarProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ProSidebarProvider>
  );
}
