import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const catalogFilters = [
  { key: "All", label: "All" },
  { key: "Groceries", label: "Groceries" },
  { key: "Oils", label: "Oils" },
  { key: "Flour", label: "Flour" },
  { key: "Dairy", label: "Dairy" },
  { key: "Bakery", label: "Bakery" },
  { key: "Spices", label: "Spices" },
];

// Catalog products data
const catalogProducts = [
  {
    name: "Basmati Rice (1kg)",
    price: 120,
    unit: "₹120.00",
    seller: "Kumar Kirana Store",
    category: "Groceries",
  },
  {
    name: "Sunflower Oil (1L)",
    price: 150,
    unit: "₹150.00",
    seller: "Sharma Wholesalers",
    category: "Oils",
  },
  {
    name: "Aashirvaad Atta (5kg)",
    price: 250,
    unit: "₹250.00",
    seller: "Goyal Groceries",
    category: "Flour",
  },
  {
    name: "Tata Salt (1kg)",
    price: 25,
    unit: "₹25.00",
    seller: "Kumar Kirana Store",
    category: "Groceries",
  },
  {
    name: "Amul Milk (1L)",
    price: 60,
    unit: "₹60.00",
    seller: "Gupta Dairy",
    category: "Dairy",
  },
  {
    name: "Britannia Bread",
    price: 40,
    unit: "₹40.00",
    seller: "Modern Bakery",
    category: "Bakery",
  },
];

// Responsive image placeholder style
const placeholderStyle = {
  width: "100%",
  height: 0,
  paddingTop: "66.666%", // 300/200 aspect ratio
  background: "#ededed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 22,
  color: "#a7a7a7",
  position: "relative",
};

export default function Catalog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Handle product search and filter
  const shownProducts = catalogProducts.filter((product) => {
    // Filter match
    const filterMatch = filter === "All" || product.category === filter;
    // Search match
    const searchMatch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.seller.toLowerCase().includes(search.toLowerCase());
    return filterMatch && searchMatch;
  });

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
        {/* Page Header */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#2e4254",
            letterSpacing: 1,
            mb: 1,
            fontSize: { xs: 22, md: 28 },
          }}
        >
          Product Catalog
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {catalogFilters.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              clickable
              color={filter === f.key ? "primary" : "default"}
              onClick={() => setFilter(f.key)}
              sx={{
                fontWeight: filter === f.key ? 700 : 500,
                background: filter === f.key ? "#2864fd" : "#f2f3f7",
                color: filter === f.key ? "#fff" : "#2e4254",
              }}
            />
          ))}
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            width: { xs: "calc(100% - 32px)", sm: 320 }, // matches container padding
            mb: 2,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: 2,
            px: 2,
            py: 0.5,
          }}
        >
          <InputBase
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            sx={{
              fontSize: "1rem",
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
            }}
          />
        </Box>

        {/* Products Grid */}
        <Grid
          container
          spacing={isMobile ? 2 : 4}
          sx={{
            mt: 1,
            mb: 2,
          }}
        >
          {shownProducts.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" sx={{ color: "#63687a" }}>
                No products found.
              </Typography>
            </Box>
          ) : (
            shownProducts.map((product, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.name + idx}
                sx={{
                  display: "flex",
                  px: { xs: 1, md: 0 },
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: "0 1px 8px rgba(50,60,80,0.07)",
                    minHeight: 270,
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Product placeholder image */}
                  <Box sx={placeholderStyle}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        fontSize: 22,
                        fontWeight: 400,
                        opacity: 0.7,
                      }}
                    >
                      300 × 200
                    </Box>
                  </Box>
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "#1a2535",
                        mb: 0.5,
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#2864fd", fontWeight: 600, mb: 0.2 }}
                    >
                      Sold by {product.seller}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#069326", fontWeight: 700, mt: 0.5 }}
                    >
                      {product.unit}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        background: "#2864fd",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        py: 1,
                        fontSize: "1rem",
                        boxShadow: "0 2px 12px rgba(40,100,253,0.05)",
                        ":hover": { background: "#235bdb" },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
