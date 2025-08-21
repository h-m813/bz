import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const categories = [
  "All",
  "Groceries",
  "Oils",
  "Flour",
  "Dairy",
  "Bakery",
  "Spices",
];

const products = [
  {
    id: 1,
    name: "Basmati Rice (1kg)",
    seller: "Kumar Kirana Store",
    price: 120,
    category: "Groceries",
  },
  {
    id: 2,
    name: "Sunflower Oil (1L)",
    seller: "Sharma Wholesalers",
    price: 150,
    category: "Oils",
  },
  {
    id: 3,
    name: "Aashirvaad Atta (5kg)",
    seller: "Goyal Groceries",
    price: 250,
    category: "Flour",
  },
  {
    id: 4,
    name: "Tata Salt (1kg)",
    seller: "Kumar Kirana Store",
    price: 25,
    category: "Groceries",
  },
  {
    id: 5,
    name: "Amul Milk (1L)",
    seller: "Gupta Dairy",
    price: 60,
    category: "Dairy",
  },
  {
    id: 6,
    name: "Britannia Bread",
    seller: "Modern Bakery",
    price: 40,
    category: "Bakery",
  },
];

export default function Catalog() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // phones
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // small tablets
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // desktops and large tablets
  const [selectedTab, setSelectedTab] = useState(0);

  const filteredProducts =
    selectedTab === 0
      ? products
      : products.filter((prod) => prod.category === categories[selectedTab]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1600,
        mx: "auto",
        mr: { xs: 1, sm: 2, md: 6 }, // Responsive margin-right added here
        pt: { xs: 2, md: 3 },
        pb: { xs: 3, md: 5 },
        px: { xs: 1, sm: 2, md: 3, lg: 8 },
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <Typography
        fontWeight={700}
        fontSize={{ xs: 24, md: 32 }}
        sx={{ mb: { xs: 2, md: 3 }, color: "#22364a" }}
      >
        Product Catalog
      </Typography>

      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        variant={isXs ? "scrollable" : "standard"}
        scrollButtons={isXs ? "auto" : false}
        sx={{
          minHeight: 0,
          mb: { xs: 2, md: 3 },
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 600,
            color: "#4d5e6c",
            background: "#f5f6f8",
            borderRadius: 2,
            mx: 0.5,
            minHeight: 38,
            px: 2.5,
            fontSize: { xs: 13, sm: 15 },
          },
          "& .Mui-selected": {
            background: "#2961e1",
            color: "#fffffff6",
          },
        }}
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} />
        ))}
      </Tabs>

      {/* Product Grid */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid
              key={product.id}
              item
              xs={12} // 1 card per row on phones
              sm={6} // 2 cards per row on small tablets
              md={4} // 3 cards per row on medium screens
              lg={3} // 4 cards per row on large screens/desktops
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  boxShadow: 0,
                  background: "#f8fafc",
                  border: "1px solid #ededed",
                  width: "100%",
                  maxWidth: 340,
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: 120, sm: 150, md: 200 },
                    background: "#cccccc",
                    color: "#7d7d7d",
                    fontWeight: 700,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: { xs: "1.3rem", sm: "1.7rem", md: "2rem" },
                  }}
                >
                  300 × 200
                </Box>
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: 2,
                    pb: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:last-child": { pb: 1.5 },
                  }}
                >
                  <Typography
                    fontWeight={700}
                    fontSize={16}
                    color="#22364a"
                    sx={{ mb: 0.3 }}
                  >
                    {product.name}
                  </Typography>
                  <Typography fontSize={14} color="#757575" sx={{ mb: 0.5 }}>
                    Sold by {product.seller}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    fontSize={17}
                    color="#2961e1"
                    sx={{ mb: 1 }}
                  >
                    ₹{product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      background: "#2961e1",
                      color: "#fff",
                      borderRadius: 2,
                      fontSize: 16,
                      mt: "auto",
                      boxShadow: 0,
                      py: 1.1,
                      "&:hover": { background: "#1b42ad" },
                    }}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: "center", color: "#888", my: 6 }}>
              <Typography fontWeight={500} fontSize={20}>
                No products found in this category.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
