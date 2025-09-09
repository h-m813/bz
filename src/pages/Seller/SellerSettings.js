import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfileField,
  updateNotificationField,
} from "../../redux/slices/sellerSettingsSlice";

export default function SellerSettings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.sellerSettings.profile);
  const notifications = useSelector(
    (state) => state.sellerSettings.notifications
  );

  const handleProfileChange = (field) => (e) => {
    dispatch(updateProfileField({ field, value: e.target.value }));
  };

  const handleNotificationChange = (field) => (e) => {
    dispatch(updateNotificationField({ field, value: e.target.checked }));
  };

  const inputMarginStyle = { mb: isMobile ? 2 : 0 };

  return (
    <Box
      sx={{
        top: 0,
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200, // Constrain content width consistent with Catalog
          boxSizing: "border-box",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          fontWeight={700}
          mb={3}
          sx={{ fontSize: { xs: 26, md: 32 }, color: "#222" }}
        >
          Settings
        </Typography>

        {/* Business Profile Card */}
        <Card
          elevation={1}
          sx={{
            mb: 4,
            borderRadius: 5,
            backgroundColor: "#fff",
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 4 },
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
              color="textPrimary"
            >
              Business Profile
            </Typography>
            <Typography variant="body2" mb={3} color="primary.main">
              Manage your public business information.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Business Name"
                  name="businessName"
                  value={profile.businessName}
                  onChange={handleProfileChange("businessName")}
                  fullWidth
                  size="small"
                  sx={inputMarginStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Person"
                  name="contactPerson"
                  value={profile.contactPerson}
                  onChange={handleProfileChange("contactPerson")}
                  fullWidth
                  size="small"
                  sx={inputMarginStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange("phone")}
                  fullWidth
                  size="small"
                  sx={inputMarginStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Business Address"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange("address")}
                  fullWidth
                  size="small"
                  multiline
                  minRows={2}
                  sx={inputMarginStyle}
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth={isMobile}
                sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16 }}
              >
                Save Profile
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card
          elevation={1}
          sx={{
            borderRadius: 5,
            backgroundColor: "#fff",
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 4 },
            mb: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
              color="textPrimary"
            >
              Notification Settings
            </Typography>
            <Typography variant="body2" mb={3} color="primary.main">
              Manage how you receive notifications.
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.newOrders}
                      onChange={handleNotificationChange("newOrders")}
                      color="primary"
                    />
                  }
                  label="New Orders"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.payments}
                      onChange={handleNotificationChange("payments")}
                      color="primary"
                    />
                  }
                  label="Payments"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.chatMessages}
                      onChange={handleNotificationChange("chatMessages")}
                      color="primary"
                    />
                  }
                  label="Chat Messages"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.buyerRequests}
                      onChange={handleNotificationChange("buyerRequests")}
                      color="primary"
                    />
                  }
                  label="Buyer Requests"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth={isMobile}
                sx={{ borderRadius: 3, fontWeight: 600, fontSize: 16 }}
              >
                Save Notifications
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
