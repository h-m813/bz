// components/TestimonialSection.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Rating,
  CircularProgress,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../redux/slices/testimonialSlice";
import HeaderSection from "../pages/HeaderSection";
import Footer from "../pages/Footer";
import Navbar from "../Components/Navbar";
const TestimonialSection = () => {
  const imageUrl =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
  const titleText = "Bizbridge";
  const descriptionText =
    "At BizBridge, we  your privacy and are committed to protecting the personal and business information you entrust to us. This Privacy Policy explains how we collect, use, and safeguard your data to ensure a secure and transparent experience while using our platform.";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const {
    items: testimonials = [], // default to empty array if undefined
    loading,
    error,
  } = useSelector((state) => state.testimonials);

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched testimonials:", testimonials); // Debugging
  }, [testimonials]);

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <HeaderSection
          image={imageUrl}
          title={titleText}
          description={descriptionText}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fff",
          py: { xs: 6, md: 10 },
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Section Title */}
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          color="#111827"
          sx={{ mb: 2 }}
        >
          What Our Customers Say
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: "auto" }}
        >
          Join thousands of satisfied customers who have transformed their
          business with BizBridge.
        </Typography>

        {/* Loading */}
        {loading && (
          <Box textAlign="center" sx={{ py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error */}
        {error && (
          <Typography color="error" align="center" sx={{ mb: 4 }}>
            {error}
          </Typography>
        )}

        {/* Testimonials */}
        {!loading && !error && (
          <>
            <Grid
              container
              spacing={isMobile ? 3 : 4}
              justifyContent="center"
              alignItems="stretch"
            >
              {visibleTestimonials.length === 0 && (
                <Typography
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 4 }}
                >
                  No testimonials available at the moment.
                </Typography>
              )}

              {visibleTestimonials.map((t) => (
                <Grid item xs={12} sm={6} md={4} key={t.id}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      boxShadow: "0 2px 12px 0 #e5e7eb",
                    }}
                    elevation={0}
                  >
                    <CardContent sx={{ textAlign: "left", px: 3, py: 4 }}>
                      <Box
                        sx={{
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Avatar
                          src={t.avatar}
                          alt={t.name}
                          sx={{ width: 44, height: 44 }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight={700}>
                            {t.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {t.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body1"
                        color="#374151"
                        sx={{ mb: 3, minHeight: 96 }}
                      >
                        {`"${t.quote}"`}
                      </Typography>
                      <Rating value={t.rating} readOnly size="small" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Read More Button */}
            {testimonials?.length > 3 && (
              <Box textAlign="center" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  // color="primary"
                  onClick={() => setShowAll(!showAll)}
                  sx={{
                    borderRadius: "20px",
                    px: 3,
                    py: 1,
                    color: "#4747e4ff", // Make text visible
                  }}
                >
                  {showAll ? "Show Less" : "Read More"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default TestimonialSection;
