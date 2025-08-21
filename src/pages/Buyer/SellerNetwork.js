import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  TextField,
  InputAdornment,
  Switch,
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
  return (
    <Box sx={{ width: "100%" }}>
      {/* Top Bar: Search & Find Sellers */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          gap: 2,
          flexWrap: "wrap",
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
            "&:hover": { background: "#1746a2" },
          }}
        >
          Find New Sellers
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {/* Buyer/Seller Switch */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontWeight={600} color="#2961e1" fontSize={15}>
            Buyer
          </Typography>
          <Switch
            checked={false}
            color="primary"
            sx={{
              "& .MuiSwitch-thumb": { background: "#2961e1" },
            }}
          />
          <Typography fontWeight={600} color="#8b99a8" fontSize={15}>
            Seller
          </Typography>
        </Box>
      </Box>

      {/* Seller Network Title */}
      <Typography fontWeight={700} fontSize={23} color="#2e4254" sx={{ mb: 2 }}>
        Seller Network
      </Typography>

      {/* Connected Sellers */}
      <Typography
        fontWeight={700}
        fontSize={17}
        color="#2e4254"
        sx={{ mb: 1.5 }}
      >
        My Connected Sellers
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {connectedSellers.map((seller) => (
          <Grid item xs={12} sm={6} md={4} key={seller.name}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                background: "#fff",
                boxShadow: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
                    color: "#2e4254",
                  }}
                >
                  {seller.initials}
                </Box>
                <Box>
                  <Typography fontWeight={700} fontSize={16} color="#2e4254">
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
                  mt: 1,
                  background: "#2961e1",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  fontSize: 15,
                  boxShadow: 0,
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
        fontSize={17}
        color="#2e4254"
        sx={{ mb: 1.5 }}
      >
        Recommended Sellers
      </Typography>
      <Grid container spacing={2}>
        {recommendedSellers.map((seller) => (
          <Grid item xs={12} sm={6} md={4} key={seller.name}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                background: "#fff",
                boxShadow: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
                    color: "#2e4254",
                  }}
                >
                  {seller.initials}
                </Box>
                <Box>
                  <Typography fontWeight={700} fontSize={16} color="#2e4254">
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
                  mt: 1,
                  background: "#e9edf7",
                  color: "#2e4254",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,
                  fontSize: 15,
                  boxShadow: 0,
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
  );
}
