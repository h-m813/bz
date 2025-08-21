import React from "react";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Blue theme
  const blueLight = "#e3fafd";
  const blueMain = "#1976d2";
  const blueDark = "#115293";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f9fafb",
        px: { xs: 0, sm: 0, md: 8 },
        py: { xs: 2, sm: 4, md: 12 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          width: "100%",
          textAlign: "center",
          px: 2,
        }}
      >
        {/* Main Heading */}
        <Typography
          variant={isMobile ? "h4" : "h3"}
          sx={{
            fontWeight: 700,
            color: blueDark,
            mb: 3,
            fontFamily: "Roboto, Arial, sans-serif",
          }}
        >
          About BizBridge
        </Typography>

        {/* Paragraph */}
        <Typography
          sx={{
            color: blueMain,
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.65,
            mb: 5,
            fontFamily: "Roboto, Arial, sans-serif",
          }}
        >
          At BizBridge, we harness the power of AI and cutting-edge digital
          strategies to make buying and selling businesses easier, faster, and
          more affordable. Since our inception, BizBridge has empowered
          entrepreneurs and SMEs with transformative technology, connecting
          opportunities and driving business growth across industries.
        </Typography>

        {/* Tagline Section */}
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{
            maxWidth: 900,
            mx: "auto",
            px: isMobile ? 0 : 0, // Explicit zero padding on mobile and desktop
            paddingLeft: "0px",
          }}
        >
          {[
            "A DPIIT Recognised Startup under Startup India",
            "Registered with iStart Rajasthan",
            "Incubated at BTH, under the iStart program",
          ].map((line, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Box
                sx={{
                  backgroundColor: blueLight,
                  borderRadius: 3,
                  boxShadow: `0 4px 12px 0 ${blueLight}`,
                  padding: 3,
                  color: blueDark,
                  fontWeight: 600,
                  fontSize: isMobile ? 14 : 16,
                  minHeight: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: `0 8px 30px 0 ${blueMain}`,
                    transform: "translateY(-5px)",
                    cursor: "pointer",
                    backgroundColor: blueMain,
                    color: "#fff",
                  },
                  // Ensuring the inner box uses full width on mobile without unnecessary padding
                  width: "100%",
                  maxWidth: "320px",
                }}
              >
                {line}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
