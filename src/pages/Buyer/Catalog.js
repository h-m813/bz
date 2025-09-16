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
import { useCart } from "../../pages/Buyer/CartContext"; // Adjust path based on your project
import { useNavigate } from "react-router-dom";

const catalogFilters = [
  { key: "All", label: "All" },
  { key: "Groceries", label: "Groceries" },
  { key: "Oils", label: "Oils" },
  { key: "Flour", label: "Flour" },
  { key: "Dairy", label: "Dairy" },
  { key: "Bakery", label: "Bakery" },
  { key: "Spices", label: "Spices" },
];

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

const placeholderStyle = {
  width: "100%",
  paddingTop: "66.66%", // 3:2 ratio
  background: "#ededed",
  position: "relative",
  borderRadius: 1,
};

export default function Catalog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const shown = catalogProducts.filter((product) => {
    const matchFilter = filter === "All" || product.category === filter;
    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.seller.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleAdd = (product) => {
    addToCart(product);
    // optionally show a snackbar if you have one
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
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#22364a",
            mb: 1,
            fontSize: { xs: 22, md: 28 },
          }}
        >
          Product Catalog
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {catalogFilters.map((f) => (
            <Chip
              key={f.key}
              label={f.label}
              clickable
              color={filter === f.key ? "primary" : "default"}
              onClick={() => setFilter(f.key)}
              sx={{
                fontWeight: filter === f.key ? 700 : 500,
                backgroundColor: filter === f.key ? undefined : "#f0f3fb",
              }}
            />
          ))}
        </Box>

        <InputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          sx={{
            px: 2,
            py: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            borderRadius: 2,
            mb: 3,
            width: { xs: "100%", sm: 320 },
            bgcolor: "background.paper",
          }}
        />

        <Grid container spacing={isMobile ? 2 : 4}>
          {shown.length === 0 ? (
            <Typography sx={{ color: "#888" }}>No products found.</Typography>
          ) : (
            shown.map((product, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box sx={placeholderStyle}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#999",
                        fontSize: 22,
                      }}
                    >
                      300 × 200
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={700}
                      gutterBottom
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => window.open(product.seller, "_blank")}
                    >
                      Sold by {product.seller}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="success.main"
                      sx={{ mt: 1 }}
                    >
                      {product.unit}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleAdd(product)}
                      sx={{
                        fontWeight: 700,
                        textTransform: "none",
                        py: 1,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
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
