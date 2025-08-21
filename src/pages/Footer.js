// components/Footer.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  IconButton,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../Images/logo.jpg";
import ScrollToSectionButton from "../Components/ScrollToSectionButton";

const socials = [
  { icon: <Twitter sx={{ fontSize: 28 }} />, label: "Twitter", href: "#" },
  { icon: <LinkedIn sx={{ fontSize: 28 }} />, label: "LinkedIn", href: "#" },
  { icon: <Facebook sx={{ fontSize: 28 }} />, label: "Facebook", href: "#" },
];

const columns = [
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Features", href: "/feature-analytics" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    heading: "Support",

    links: [{ label: "Contact Us", href: "/contact" }],
    links: [{ label: "Pricing", href: "/trust" }],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", to: "/terms-of-service" },
      { label: "Privacy Policy", to: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "#151c29", color: "#d1d5db", pt: 7, pb: 3 }}>
      <Box
        maxWidth="lg"
        mx="auto"
        px={{ xs: 2, sm: 4 }}
        pb={3}
        borderBottom="1px solid #222c40"
      >
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Left: Logo & About */}
          <Grid item xs={12} sm={5} md={4} xl={3}>
            <Stack spacing={2} direction="column">
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  component="img"
                  src={logo}
                  width={34}
                  height={34}
                  alt="BizBridge"
                  sx={{ borderRadius: "8px" }}
                />
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#f5f5f5"
                  letterSpacing={1}
                >
                  BizBridge
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="#d1d5db"
                lineHeight={1.7}
                sx={{ maxWidth: 270 }}
              >
                Bridging the gap between business and technology with
                intelligent automation and seamless integrations.
              </Typography>

              {/* Social Icons */}
              <Stack direction="row" spacing={1}>
                {socials.map((soc, i) => (
                  <IconButton
                    key={i}
                    size="medium"
                    aria-label={soc.label}
                    href={soc.href}
                    sx={{
                      bgcolor: "#202941",
                      color: "#d1d5db",
                      "&:hover": { bgcolor: "#2563eb", color: "#fff" },
                      transition: "0.2s",
                      p: 1.2,
                    }}
                  >
                    {soc.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Right: Footer Nav Columns */}
          <Grid
            item
            xs={12}
            sm={7}
            md={8}
            xl={7}
            container
            spacing={isMobile ? 2 : 0}
            justifyContent="flex-end"
          >
            {columns.map((col) => (
              <Grid
                key={col.heading}
                item
                xs={12}
                sm={4}
                md={4}
                sx={{ mb: isMobile ? 2 : 0 }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  color="#f5f5f5"
                  gutterBottom
                  sx={{ letterSpacing: "0.6px" }}
                >
                  {col.heading}
                </Typography>

                <Stack spacing={1}>
                  {col.links.map((link) =>
                    link.to ? (
                      <Link
                        key={link.label}
                        component={RouterLink}
                        to={link.to}
                        underline="hover"
                        variant="body2"
                        color="#b0b8c3"
                        sx={{ "&:hover": { color: "#fff" }, pr: 1 }}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        underline="hover"
                        variant="body2"
                        color="#b0b8c3"
                        sx={{ "&:hover": { color: "#fff" }, pr: 1 }}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      {/* Copyright */}
      <Box
        maxWidth="lg"
        mx="auto"
        mt={3}
        px={{ xs: 2, sm: 4 }}
        textAlign="center"
      >
        <Typography
          variant="body2"
          color="#8d99ae"
          sx={{ fontSize: "0.98rem", fontWeight: 400 }}
        >
          © 2025 BizBridge. All rights reserved.
        </Typography>
      </Box>

      {/* Scroll to Top Button */}
      <ScrollToSectionButton
        targetId={null} // null → will scroll to top
        showAfter={200}
        tooltip="Go to top"
      />
    </Box>
  );
}
