import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Link,
} from "@mui/material";

// Demo Offer Data
const offers = [
  {
    id: 1,
    category: "Oils",
    title: "Diwali Dhamaka: 20% Off",
    seller: "Sharma Wholesalers",
    sellerLink: "#",
    description:
      "Get a flat 20% discount on all cooking oils. Minimum purchase of ₹5000.",
    expires: "2023-11-15",
  },
  {
    id: 2,
    category: "Groceries",
    title: "Bulk Buy Bonanza",
    seller: "Kumar Kirana Store",
    sellerLink: "#",
    description:
      "Buy 10kg of Basmati Rice and get 1kg of Sugar absolutely free!",
    expires: "2023-11-20",
  },
  {
    id: 3,
    category: "Textiles",
    title: "Winter Special",
    seller: "Gupta Textiles",
    sellerLink: "#",
    description:
      "Flat 15% off on all blankets and shawls. Stock up for the cold season.",
    expires: "2023-12-31",
  },
];

export default function Offers() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1600px",
        mx: "auto",
        pt: { xs: 2, md: 3 },
        pb: { xs: 3, md: 5 },
        px: { xs: 1, sm: 2, md: 4, lg: 8 },
        boxSizing: "border-box",
      }}
    >
      <Typography
        fontWeight={700}
        fontSize={{ xs: 22, md: 30 }}
        sx={{ color: "#22364a", mb: { xs: 2, md: 3 } }}
      >
        Active Offers & Schemes
      </Typography>

      {/* Card Grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: { xs: 3, md: 4 },
          width: "100%",
        }}
      >
        {offers.map((offer) => (
          <Card
            key={offer.id}
            sx={{
              flex: isMobile ? "unset" : "1 1 0",
              maxWidth: 400,
              minWidth: 240,
              background: "#fff",
              borderRadius: 3,
              boxShadow: 0,
              border: "1px solid #ededed",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Placeholder Image */}
            <Box
              sx={{
                width: "100%",
                height: 250,
                background: "#e9e9e9",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 38,
                color: "#b0b0b0",
                fontWeight: 600,
                mb: 0,
              }}
            >
              400 × 250
            </Box>
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                pb: 0,
              }}
            >
              <Chip
                label={offer.category}
                sx={{
                  fontSize: 13,
                  fontWeight: 500,
                  background: "#f2f3f7",
                  color: "#22364a",
                  mb: 1.3,
                  width: "fit-content",
                }}
              />
              <Typography
                fontWeight={700}
                fontSize={18}
                sx={{ mb: 0.8, color: "#22364a" }}
              >
                {offer.title}
              </Typography>
              <Typography
                fontWeight={500}
                sx={{ mb: 0.5, fontSize: 14, color: "#22364a" }}
              >
                by{" "}
                <Link
                  href={offer.sellerLink}
                  sx={{
                    fontWeight: 600,
                    color: "#2961e1",
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  {offer.seller}
                </Link>
              </Typography>
              <Typography sx={{ mb: 1.3, fontSize: 15, color: "#444" }}>
                {offer.description}
              </Typography>
              <Typography
                sx={{
                  color: "#8b99a8",
                  fontSize: 13.5,
                  mb: 1,
                  fontWeight: 400,
                }}
              >
                Expires on: {offer.expires}
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                sx={{
                  background: "#2961e1",
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: 17,
                  py: 1,
                  boxShadow: 0,
                  textTransform: "none",
                  "&:hover": {
                    background: "#1a3c93",
                  },
                }}
              >
                View Products
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
