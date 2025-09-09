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
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 4, md: 10 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 3, md: 0 },
            }}
          >
            <Box
              component="img"
              src={require("../Images/about.jpg")} // Adjust the path as needed
              alt="About BizBridge"
              sx={{
                width: { xs: "90%", sm: "80%", md: "420px" },
                maxWidth: "420px",
                height: "auto",
                borderRadius: 4,
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Content Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              px: { xs: 0, md: 2 },
              textAlign: { xs: "center", md: "left" },
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
              strategies to make buying and selling businesses easier, faster,
              and more affordable. Since our inception, BizBridge has empowered
              entrepreneurs and SMEs with transformative technology, connecting
              opportunities and driving business growth across industries.
            </Typography>

            {/* Tagline Section */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  maxWidth: 900,
                }}
              >
                {[
                  "A DPIIT Recognised Startup under Startup India",
                  "Registered with iStart Rajasthan",
                  "Incubated at BTH, under the iStart program",
                ].map((line, idx) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={idx}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
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
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          boxShadow: `0 8px 30px 0 ${blueMain}`,
                          transform: "translateY(-5px)",
                          cursor: "pointer",
                          backgroundColor: blueMain,
                          color: "#fff",
                        },
                        width: "100%",
                        maxWidth: "280px",
                        textAlign: "center",
                      }}
                    >
                      {line}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
