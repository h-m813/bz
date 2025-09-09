import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

export default function SellerPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          px: { xs: 1, sm: 2, md: 3 },
          background: "transparent",
        }}
      >
        {/* Header */}
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight={700}
          gutterBottom
          sx={{ letterSpacing: 0.5, color: "#22364a" }}
        >
          Seller Dashboard
        </Typography>

        {/* KPI Cards */}
        <Grid
          container
          spacing={isMobile ? 2 : 4}
          sx={{ mb: { xs: 2, md: 4 } }}
        >
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography
                  fontSize={18}
                  color="#8b9ab4"
                  fontWeight={700}
                  gutterBottom
                >
                  {`Label ${index + 1}`}
                </Typography>
                <Typography fontSize={32} fontWeight={800} color="#222">
                  {`Value ${index + 1}`}
                </Typography>
                <Typography fontSize={15} color="#758ce2">
                  {`Info ${index + 1}`}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Main Actions and Recent Activity */}
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                mt: { xs: 0, md: 6 },
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
              }}
            >
              <Typography
                fontWeight={800}
                fontSize={22}
                sx={{ mb: 4, color: "#22364a" }}
              >
                Quick Actions
              </Typography>
              <Stack spacing={3}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    color: "#3e4258",
                    px: 3,
                    py: 1.75,
                    textTransform: "none",
                    fontSize: "1.15rem",
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                    "&:not(:hover)": {
                      bgcolor: "#f6f7fa",
                      color: "#3e4258",
                      borderColor: "#e3eaf6",
                    },
                  }}
                  fullWidth
                >
                  Add Product
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Person2OutlinedIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    color: "#3e4258",
                    px: 3,
                    py: 1.75,
                    textTransform: "none",
                    fontSize: "1.15rem",
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                    "&:not(:hover)": {
                      bgcolor: "#f6f7fa",
                      color: "#3e4258",
                      borderColor: "#e3eaf6",
                    },
                  }}
                  fullWidth
                >
                  View Orders
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DescriptionOutlinedIcon />}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 800,
                    color: "#3e4258",
                    px: 3,
                    py: 1.75,
                    textTransform: "none",
                    fontSize: "1.15rem",
                    borderColor: "#e3eaf6",
                    bgcolor: "#f6f7fa",
                    transition:
                      "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      bgcolor: "#104ed2",
                      color: "#fff",
                      borderColor: "#104ed2",
                    },
                    "&:not(:hover)": {
                      bgcolor: "#f6f7fa",
                      color: "#3e4258",
                      borderColor: "#e3eaf6",
                    },
                  }}
                  fullWidth
                >
                  Manage Ledger
                </Button>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                mt: { xs: 0, md: 6 },
                display: "flex",
                flexDirection: "column",
                minHeight: { xs: 260, md: 350 },
              }}
            >
              <Typography
                fontWeight={800}
                fontSize={22}
                sx={{ mb: 3, color: "#22364a" }}
              >
                Recent Activity
              </Typography>
              <Typography fontSize={17} color="#607094" mb={3}>
                A log of recent orders and payments.
              </Typography>
              <Typography fontSize={18} color="#8793af" flexGrow={1}>
                No recent activity.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
