import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCart } from "../../pages/Buyer/CartContext"; // Adjust path if needed
import { useSuccessSnackbar } from "../../pages/Buyer/useSuccessSnackbar"; // Adjust path if needed

const products = [
  {
    name: "Basmati Rice (1kg)",
    seller: "Kumar Kirana Store",
    price: 120,
    sellerLink: "#",
  },
  {
    name: "Sunflower Oil (1L)",
    seller: "Sharma Wholesalers",
    price: 150,
    sellerLink: "#",
  },
  {
    name: "Aashirvaad Atta (5kg)",
    seller: "Goyal Groceries",
    price: 250,
    sellerLink: "#",
  },
  {
    name: "Tata Salt (1kg)",
    seller: "Kumar Kirana Store",
    price: 25,
    sellerLink: "#",
  },
  { name: "Amul Milk (1L)", seller: "Gupta Dairy", price: 60, sellerLink: "#" },
  {
    name: "Britannia Bread",
    seller: "Modern Bakery",
    price: 40,
    sellerLink: "#",
  },
];

export default function ViewProducts() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { addToCart } = useCart();
  const [showSuccess, snackElem] = useSuccessSnackbar();

  const handleAdd = (product) => {
    addToCart(product);
    showSuccess("Add to cart successful");
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
        sx={{ width: "100%", maxWidth: 1400, mx: "auto", paddingRight: "10px" }}
      >
        <Typography
          fontWeight={700}
          fontSize={{ xs: 22, md: 28 }}
          color="#22364a"
          sx={{ mb: 3, textAlign: isMobile ? "center" : "left" }}
        >
          View Products
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4}>
          {products.map((product, idx) => (
            <Grid item xs={12} sm={6} md={4} key={product.name + idx}>
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
                {/* Image placeholder */}
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 110, sm: 130, md: 160 },
                    background: "#ececec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    color: "#b1b1b1",
                    borderRadius: 1,
                    mb: 1.5,
                  }}
                >
                  300 × 200
                </Box>
                <Typography fontWeight={700} fontSize={16} color="#22364a">
                  {product.name}
                </Typography>
                <Typography
                  fontSize={14}
                  color="#2961e1"
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    mb: 0.7,
                  }}
                  onClick={() => window.open(product.sellerLink, "_blank")}
                >
                  Sold by {product.seller}
                </Typography>
                <Typography
                  fontWeight={700}
                  fontSize={16}
                  color="#059b37"
                  sx={{ mb: 2 }}
                >
                  ₹{product.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "#2961e1",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 17,
                    borderRadius: 2,
                    py: 1.1,
                    textTransform: "none",
                    "&:hover": { background: "#1146aa" },
                    mt: "auto",
                  }}
                  onClick={() => handleAdd(product)}
                >
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
        {snackElem}
      </Box>
    </Box>
  );
}
