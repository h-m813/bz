import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  Store,
  ShoppingCart,
  Assignment,
  LocalOffer,
  Chat,
  Settings,
  Support,
  Book,
  Menu as MenuIcon,
} from "@mui/icons-material";

const drawerWidth = 230;

const sidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, route: "/Buyer-Dashboard1" },
  {
    text: "Seller Network",
    icon: <Store />,
    route: "/Buyer-Dashboard1/seller-network",
  },
  { text: "Catalog", icon: <Book />, route: "/Buyer-Dashboard1/catalog" },
  {
    text: "My Orders",
    icon: <ShoppingCart />,
    route: "/Buyer-Dashboard1/my-orders",
  },
  { text: "Ledger", icon: <Assignment />, route: "/Buyer-Dashboard1/ledger" },
  { text: "Offers", icon: <LocalOffer />, route: "/offers" },
  { text: "Chat", icon: <Chat />, route: "/chat" },
  { text: "Settings", icon: <Settings />, route: "/settings" },
  { text: "Support", icon: <Support />, route: "/support" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerContents = (
    <>
      <Box sx={{ px: 3, py: 2 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "#fb8900", letterSpacing: 1, fontFamily: "inherit" }}
        >
          <span style={{ marginRight: 8 }}>
            <span
              style={{
                display: "inline-block",
                width: 25,
                height: 25,
                background: "#fb8900",
                borderRadius: 5,
              }}
            />
          </span>
          BizBridge
        </Typography>
      </Box>
      <Divider />
      <Typography
        sx={{
          px: 3,
          py: 1,
          fontWeight: 600,
          color: "#2e4254",
          fontSize: 15,
          letterSpacing: 0.5,
        }}
      >
        Buyer View
      </Typography>
      <List>
        {sidebarItems.map(({ text, icon, route }) => (
          <ListItem
            button
            key={text}
            selected={location.pathname === route}
            sx={{
              py: 1,
              mx: 1,
              my: 0.5,
              borderRadius: 2,
              color: "#2e4254",
              background: location.pathname === route ? "#f2f3f7" : "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              "&:hover": {
                background: "#d87106",
                color: "#fff",
              },
              fontWeight: location.pathname === route ? 700 : 600,
              maxWidth: "100%",
              overflowX: "hidden",
            }}
            onClick={() => {
              navigate(route);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === route ? "#fb8900" : "#2e4254",
                minWidth: 0,
                pr: 1,
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                fontWeight: location.pathname === route ? 700 : 600,
                fontSize: 15,
                letterSpacing: 0.2,
                sx: {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%", // Use % not vw for less overflow risk
        minWidth: 0, // Critical for flex layouts to prevent overflow
        overflowX: "hidden", // Only at root container
        background: "#f2f3f7",
        boxSizing: "border-box",
      }}
    >
      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#fff",
            borderRight: "1px solid #ededed",
            overflowX: "hidden",
            overflowY: "auto",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {drawerContents}
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          width: "100%", // Instead of complicated vw calculations
          minWidth: 0, // Critical for flex parent to allow children to shrink
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* Top AppBar */}
        <Box
          sx={{
            height: 60,
            background: "#fff",
            borderBottom: "1px solid #ededed",
            display: "flex",
            alignItems: "center",
            px: { xs: 2, sm: 4 },
            position: "sticky",
            top: 0,
            zIndex: 10,
            flexShrink: 0,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
              size="large"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
          )}
          <input
            placeholder="Search products, orders..."
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "9px 18px",
              borderRadius: 7,
              border: "1px solid #eee",
              fontSize: "1.05rem",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#f1f1f1",
              ml: 2,
              minWidth: 28,
              minHeight: 28,
            }}
          />
        </Box>
        {/* Routed Main Area */}
        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 4 },

            width: "100%", // Content fits container
            mx: "auto",
            minHeight: "calc(100vh - 60px)",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
