import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { reloadUser } from "./redux/slices/userSlice";
import store from "./redux/store";

// Your page/component imports
import Mode from "./pages/Mode";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./pages/Buyer/DashboardLayout";
import BuyerCatalog from "./pages/Buyer/Catalog";
import ChatPage from "./pages/Buyer/Chat";
import SettingPage from "./pages/Buyer/Setting";
import OffersPage from "./pages/Buyer/Offers";
import BuyerDashboard from "./pages/Buyer/BuyerDashboard";
import MyOrders from "./pages/Buyer/MyOrders";
import Ledger from "./pages/Buyer/Ledger";
import SupportPage from "./pages/Buyer/Support";
import SellerNetwork from "./pages/Buyer/SellerNetwork";
import SellerDashboardLayout from "./pages/Seller/SellerDashboardLayout";
import SellerPage from "./pages/Seller/Seller";
import Catalog from "./pages/Seller/Catalog";
import BuyerNetwork from "./pages/Seller/BuyerNetwork";
import Order from "./pages/Seller/Order";
import LedgerPage from "./pages/Seller/Ledger";
import PaymentsPage from "./pages/Seller/Payments";
import SchemesAdsPage from "./pages/Seller/SchemesAds";
import SellerAnalytics from "./pages/Seller/SellerAnalytics";
import SellerChat from "./pages/Seller/SellerChat";
import SellerSettings from "./pages/Seller/Settings";
import SellerSupport from "./pages/Seller/Support";
import InterestTransactionCalculator from "./pages/Seller/InterestTransactionCalculator";
import SelectModePage from "./pages/SelectModePage";
import ViewProducts from "./pages/Buyer/ViewProducts";
import CartPage from "./pages/Buyer/CartPage";

import { CartProvider } from "./pages/Buyer/CartContext"; // <- Your cart context import

function AppContent() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      store.dispatch(reloadUser());
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/select-mode" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/select-mode" replace /> : <Login />
        }
      />
      <Route
        path="/select-mode"
        element={
          isAuthenticated ? (
            <SelectModePage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Buyer routes wrapped with CartProvider */}
      <Route
        element={
          <CartProvider>
            <Outlet />
          </CartProvider>
        }
      >
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
          <Route path="cart" element={<CartPage />} />
          <Route path="view-products" element={<ViewProducts />} />
        </Route>
      </Route>

      {/* Seller Dashboard routes */}
      <Route path="/seller-dashboard" element={<SellerDashboardLayout />}>
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
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
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
