import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const connectedSellers = [
  { name: "Kumar Kirana Store", city: "Bangalore", initials: "KK" },
  { name: "Sharma Textiles", city: "Mumbai", initials: "ST" },
  { name: "Singh Electronics", city: "Delhi", initials: "SE" },
];

const recommendedSellers = [
  { name: "Goyal Groceries", city: "Pune", initials: "GG" },
  { name: "Gupta Dairy", city: "Bangalore", initials: "GD" },
];

export default function SellerNetwork() {
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
          paddingRight: "10px",
        }}
      >
        {/* Top Bar: Search & Find Sellers */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <TextField
            placeholder="Search sellers..."
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", sm: 260 },
              background: "#fff",
              borderRadius: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#8b99a8" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{
              background: "#2961e1",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              px: 2.5,
              fontSize: 16,
              boxShadow: 0,
              width: { xs: "100%", sm: "auto" },
              "&:hover": { background: "#1746a2" },
            }}
          >
            Find New Sellers
          </Button>
        </Box>

        {/* Seller Network Title */}
        <Typography
          fontWeight={700}
          fontSize={{ xs: 22, md: 28 }}
          color="#22364a"
          sx={{ mb: 3, textAlign: isMobile ? "center" : "left" }}
        >
          Seller Network
        </Typography>

        {/* Connected Sellers */}
        <Typography
          fontWeight={700}
          fontSize={{ xs: 16, md: 19 }}
          color="#22364a"
          sx={{ mb: 2, textAlign: isMobile ? "center" : "left" }}
        >
          My Connected Sellers
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4} sx={{ mb: 4 }}>
          {connectedSellers.map((seller) => (
            <Grid item xs={12} sm={6} md={4} key={seller.name}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "#fff",
                  boxShadow: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1.5,
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "#ededed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "#22364a",
                      userSelect: "none",
                    }}
                  >
                    {seller.initials}
                  </Box>
                  <Box>
                    <Typography fontWeight={700} fontSize={16} color="#22364a">
                      {seller.name}
                    </Typography>
                    <Typography fontSize={14} color="#8b99a8">
                      {seller.city}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "#2961e1",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    fontSize: 15,
                    boxShadow: 0,
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": { background: "#1746a2" },
                  }}
                >
                  View Products
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recommended Sellers */}
        <Typography
          fontWeight={700}
          fontSize={{ xs: 16, md: 19 }}
          color="#22364a"
          sx={{
            mb: 2,
            mt: { xs: 6, sm: 3, md: 4 },
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Recommended Sellers
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4} sx={{ mb: 5 }}>
          {recommendedSellers.map((seller) => (
            <Grid item xs={12} sm={6} md={4} key={seller.name}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: "#fff",
                  boxShadow: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1.5,
                  height: "100%",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "#ededed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "#22364a",
                      userSelect: "none",
                    }}
                  >
                    {seller.initials}
                  </Box>
                  <Box>
                    <Typography fontWeight={700} fontSize={16} color="#22364a">
                      {seller.name}
                    </Typography>
                    <Typography fontSize={14} color="#8b99a8">
                      {seller.city}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    background: "#e9edf7",
                    color: "#22364a",
                    fontWeight: 700,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    fontSize: 15,
                    boxShadow: 0,
                    width: { xs: "100%", sm: "auto" },
                    "&:hover": { background: "#d1dbe8" },
                  }}
                >
                  Send Connection Request
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
