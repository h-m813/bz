import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../axiosInstance";
import { message } from "antd";
import { useNavigate } from "react-router-dom"; // import useNavigate

export default function ModeSelectionPage() {
  // Access user and token from Redux store (adjust to your store path)
  const user = useSelector((state) => state.user.user);
  // const token = useSelector((state) => state.user.token);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // hook to navigate programmatically

  // Get user ID safely (fallback for _id or id)
  const userId = user?._id || user?.id;

  // If user or userId is missing, show message
  if (!user || !userId) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#fafbfc",
        }}
      >
        <Typography variant="h6" color="error">
          User not logged in.
        </Typography>
      </Box>
    );
  }

  // If token is missing, show message
  // if (!token) {
  //   return (
  //     <Box
  //       sx={{
  //         minHeight: "100vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         bgcolor: "#fafbfc",
  //       }}
  //     >
  //       <Typography variant="h6" color="error">
  //         Authentication token missing. Please login again.
  //       </Typography>
  //     </Box>
  //   );
  // }

  // Function to handle mode selection and API call
  const handleModeSelect = async (mode) => {
    console.log("Selected mode:", mode);
    console.log(userId, "userId "); //
    setLoading(true);
    try {
      const url = `/api/v1/auth/update-mode/${userId}`;
      const payload = { mode };
      // const headers = {
      //   Authorization: `Bearer ${token}`,
      //   "Content-Type": "application/json",
      // };

      console.log("Payload:", payload);
      // console.log("Headers:", headers);

      const response = await axios.patch(url, payload);

      console.log("Response data:", response.data);
      message.success(`Mode updated to ${mode} successfully!`);
      if (mode === "seller") {
        navigate("/Navbar1");
      } else if (mode === "buyer") {
        navigate("/Navbar2");
      }

      // Navigate to Navbar1 on success
      // navigate("/Navbar1");
    } catch (error) {
      console.error("Request failed with error:", error);

      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message.error(
          error.response.data.message ||
            "Failed to update mode. Please try again."
        );
      } else if (error.request) {
        console.error("No response received. Request:", error.request);
        message.error("No response from server. Please check your network.");
      } else {
        console.error("Error setting up request:", error.message);
        message.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#fafbfc",
      }}
    >
      <Typography variant="h4" sx={{ mb: 5, fontWeight: 600 }}>
        Choose Mode
      </Typography>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            px: 5,
            py: 3,
            fontSize: "1.2rem",
            borderRadius: 2,
            boxShadow: 3,
          }}
          onClick={() => handleModeSelect("seller")}
          disabled={loading}
        >
          Seller Mode
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            px: 5,
            py: 3,
            fontSize: "1.2rem",
            borderRadius: 2,
            boxShadow: 3,
          }}
          onClick={() => handleModeSelect("buyer")}
          disabled={loading}
        >
          Buyer Mode
        </Button>
      </Box>
    </Box>
  );
}
