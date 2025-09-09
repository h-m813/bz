import React, { useState, useEffect } from "react";
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
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Menu,
  MenuItem,
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
  AccountCircle,
  Menu as MenuIcon,
} from "@mui/icons-material";
import logo from "../../assets/images/logo.jpg";

const drawerWidth = 230;

const sidebarItems = [
  { text: "Dashboard", icon: <Dashboard />, route: "/seller-dashboard" },
  { text: "Catalog", icon: <Book />, route: "/seller-dashboard/catalog" },
  {
    text: "Buyer Network",
    icon: <Store />,
    route: "/seller-dashboard/buyer-network",
  },
  { text: "Orders", icon: <ShoppingCart />, route: "/seller-dashboard/orders" },
  { text: "Ledger", icon: <Assignment />, route: "/seller-dashboard/ledger" },
  {
    text: "Payments",
    icon: <Assignment />,
    route: "/seller-dashboard/payments",
  },
  {
    text: "Schemes & Ads",
    icon: <Assignment />,
    route: "/seller-dashboard/schemes-ads",
  },
  {
    text: "Analytics",
    icon: <Assignment />,
    route: "/seller-dashboard/analytics",
  },
  { text: "Chat", icon: <Chat />, route: "/seller-dashboard/seller-chat" },
  { text: "Settings", icon: <Settings />, route: "/seller-dashboard/settings" },
  { text: "Support", icon: <Support />, route: "/seller-dashboard/support" },
  {
    text: "Calculator",
    icon: <Support />,
    route: "/seller-dashboard/interest-transaction-calculator",
  },
];

export default function SellerDashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle switch for view change
  const [isSeller, setIsSeller] = useState(
    location.pathname.toLowerCase().startsWith("/seller-dashboard")
  );

  useEffect(() => {
    setIsSeller(
      location.pathname.toLowerCase().startsWith("/seller-dashboard")
    );
  }, [location.pathname]);

  const handleToggle = () => {
    if (!isSeller) {
      setIsSeller(true);
      navigate("/seller-dashboard", { replace: true });
    } else {
      setIsSeller(false);
      navigate("/buyer-dashboard", { replace: true });
    }
  };

  // Profile actions logic
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleProfileIconClick = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleOpenChatModal = () => {
    setOpenChatModal(true);
    setProfileMenuAnchor(null);
  };

  const handleOpenLogoutModal = () => {
    setOpenLogoutModal(true);
    setProfileMenuAnchor(null);
  };

  const handleCloseChatModal = () => setOpenChatModal(false);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);

  const drawerContents = (
    <>
      {/* Drawer Top Logo + Text */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: 3,
          py: 2,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="BizBridge Logo"
          sx={{
            width: 42,
            height: 42,
            borderRadius: 1,
            mr: 1.5,
          }}
        />
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "#3066be", letterSpacing: 1, fontFamily: "inherit" }}
        >
          BizBridge
        </Typography>
      </Box>

      <Divider />
      <Typography
        sx={{
          px: 3,
          py: 1,
          fontWeight: 600,
          color: "#4b4b4b",
          fontSize: 15,
          letterSpacing: 0.5,
        }}
      >
        Seller View
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
              background: location.pathname === route ? "#dae4f2" : "none",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              "&:hover": {
                background: "#3066be",
                color: "#fff",
              },
              fontWeight: location.pathname === route ? 700 : 600,
              maxWidth: "100%",
              overflowX: "hidden",
            }}
            onClick={() => {
              navigate(route, { replace: true });
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === route ? "#3066be" : "#4b4b4b",
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
        width: "100%",
        minWidth: 0,
        overflowX: "hidden",
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
          width: "100%",
          minWidth: 0,
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
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              color: "#3066be",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "240px",
            }}
            noWrap
          >
            Seller Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Toggle Switch */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#f6f9fc",
              borderRadius: 20,
              px: 0.7,
              py: 0.2,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              ml: 2,
              mr: 1,
              minWidth: 130,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: !isSeller ? 700 : 400,
                color: !isSeller ? "#2864fd" : "#63687a",
                transition: "color 0.2s",
                mr: 1,
                ml: 1,
                cursor: "pointer",
              }}
              onClick={handleToggle}
            >
              Buyer
            </Typography>
            <Switch
              checked={isSeller}
              onChange={handleToggle}
              color="primary"
              sx={{
                "& .MuiSwitch-thumb": { color: "#2864fd" },
                "& .MuiSwitch-track": { backgroundColor: "#cfd7ee" },
                mx: 0,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: isSeller ? 700 : 400,
                color: isSeller ? "#2864fd" : "#63687a",
                transition: "color 0.2s",
                ml: 1,
                cursor: "pointer",
              }}
              onClick={handleToggle}
            >
              Seller
            </Typography>
          </Box>
          {/* Profile Box with Profile Icon */}
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#f1f1f1",
              ml: 2,
              minWidth: 28,
              minHeight: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
          >
            <AccountCircle sx={{ fontSize: 40, color: "#63687a" }} />
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={() => setProfileMenuAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                setOpenChatModal(true);
                setProfileMenuAnchor(null);
              }}
            >
              <Chat sx={{ mr: 1 }} />
              Chat
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenLogoutModal(true);
                setProfileMenuAnchor(null);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>

        {/* Chat Modal */}
        <Dialog open={openChatModal} onClose={() => setOpenChatModal(false)}>
          <DialogTitle>Chat</DialogTitle>
          <DialogContent>
            <Typography>
              This is the Chat Modal. Add your chat feature here.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenChatModal(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Logout Modal */}
        <Dialog
          open={openLogoutModal}
          onClose={() => setOpenLogoutModal(false)}
        >
          <DialogTitle>Logout</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to logout?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLogoutModal(false)}>Cancel</Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                // Actual logout logic here (call API, etc)
                setOpenLogoutModal(false);
              }}
            >
              Logout
            </Button>
          </DialogActions>
        </Dialog>

        {/* Routed Main Area */}
        <Box
          sx={{
            p: { xs: 1, sm: 2, md: 4 },
            width: "100%",
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
