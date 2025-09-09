import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setProfile, setNotifications } from "../../redux/slices/settingsSlice";

export default function SettingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.settings.notifications);

  const [localProfile, setLocalProfile] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    business: "",
  });

  const [localNotifications, setLocalNotifications] =
    React.useState(notifications);

  const handleProfileChange = (field) => (e) =>
    setLocalProfile((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSwitch = (name) => (e) =>
    setLocalNotifications((prev) => ({ ...prev, [name]: e.target.checked }));

  const handleProfileSave = (e) => {
    e.preventDefault();
    dispatch(setProfile(localProfile));
  };

  const handleNotificationSave = (e) => {
    e.preventDefault();
    dispatch(setNotifications(localNotifications));
  };

  return (
    <Box
      sx={{
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
          maxWidth: 1400,
          mx: "auto",
          paddingRight: "10px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          color="text.primary"
          mb={3}
        >
          Settings
        </Typography>

        {/* Profile Information Section */}
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
          elevation={0}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 0.5, color: "#131e32" }}
          >
            Profile Information
          </Typography>
          <Typography
            sx={{ mb: 3, color: "#46639c", fontWeight: 500, fontSize: 15 }}
          >
            Update your personal and business details.
          </Typography>

          <Box component="form" onSubmit={handleProfileSave} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={localProfile.fullName}
                  onChange={handleProfileChange("fullName")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={localProfile.phone}
                  onChange={handleProfileChange("phone")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={localProfile.email}
                  onChange={handleProfileChange("email")}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Business Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={localProfile.business}
                  onChange={handleProfileChange("business")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 4,
                px: 4,
                fontWeight: 700,
                borderRadius: 2,
                backgroundColor: "#1976d2",
                textTransform: "none",
                "&:hover": { backgroundColor: "#125ea8" },
              }}
            >
              Save Profile
            </Button>
          </Box>
        </Paper>

        {/* Notification Settings Section */}
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
          elevation={0}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 3, color: "#131e32" }}
          >
            Notification Settings
          </Typography>

          <Box
            component="form"
            onSubmit={handleNotificationSave}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            {[
              {
                label: "Order Updates",
                description: "Receive notifications for order status changes.",
                name: "orderUpdates",
              },
              {
                label: "New Offers",
                description: "Get notified about new schemes and offers.",
                name: "newOffers",
              },
              {
                label: "Chat Messages",
                description: "Receive notifications for new chat messages.",
                name: "chatMessages",
              },
            ].map(({ label, description, name }) => (
              <Box
                key={name}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  backgroundColor: "#f6f9fc",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} mb={0.5}>
                    {label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </Box>
                <Switch
                  checked={localNotifications[name]}
                  onChange={handleSwitch(name)}
                  color="primary"
                  inputProps={{ "aria-label": `${label} notification toggle` }}
                />
              </Box>
            ))}
            <Button
              type="submit"
              variant="contained"
              sx={{
                alignSelf: "flex-start",
                px: 5,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                bgcolor: "#1976d2",
                "&:hover": { bgcolor: "#125ea8" },
                textTransform: "none",
              }}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
