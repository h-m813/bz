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
import Navbar from "../Components/Navbar";

const TestimonialSection = () => {
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

      {/* Parent Container */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fff",
          py: { xs: 6, md: 10 },
          px: { xs: 3, sm: 3, md: 5, lg: 8 }, // 🔥 Equal space left & right (responsive)
          maxWidth: "1280px", // Prevents content from stretching too wide
          mx: "auto", // centers parent box
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
                  onClick={() => setShowAll(!showAll)}
                  sx={{
                    borderRadius: "20px",
                    px: 3,
                    py: 1,
                    color: "#4747e4ff",
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
