import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, Outlet } from "react-router-dom"; // <-- Import Outlet

const navItems = [
  { label: "Buyer Network", path: "/BuyerNetwork" },
  { label: "Catalog", path: "/Catalog" },
  { label: "Dashboard", path: "/Dashboard" },
];

export default function Navbar1() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#298be6", boxShadow: 0 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 56 }}>
            {/* Brand Section */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                letterSpacing: 0.5,
                color: "#fff",
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              Bizbridge
            </Typography>
            {/* Nav Items */}
            {!isMobile && (
              <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavClick(item.path)}
                    sx={{
                      color: "#fff",
                      fontWeight: 400,
                      fontSize: "1rem",
                      letterSpacing: 0.5,
                      textTransform: "none",
                      "&:hover": { background: "rgba(255,255,255,0.15)" },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Hamburger for Mobile */}
            {isMobile && (
              <Box sx={{ ml: "auto" }}>
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleMenuOpen}
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  PaperProps={{
                    sx: { background: "#298be6", color: "#fff", minWidth: 160 },
                  }}
                >
                  {navItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={() => handleNavClick(item.path)}
                      sx={{
                        "&:hover": { background: "#1c6fc7" },
                        fontWeight: 400,
                        fontSize: "1rem",
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* Content will be rendered here */}
      <Box sx={{ mt: 2, px: 2 }}>
        <Outlet />
      </Box>
    </>
  );
}
