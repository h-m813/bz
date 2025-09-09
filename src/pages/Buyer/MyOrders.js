import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Demo order data for the UI
const initialOrders = [
  {
    id: "ORD001",
    date: "2023-10-25",
    seller: "Kumar Kirana Store",
    items: 5,
    amount: 5250,
    status: "Delivered",
  },
  {
    id: "ORD002",
    date: "2023-10-28",
    seller: "Sharma Textiles",
    items: 2,
    amount: 12000,
    status: "Shipped",
  },
  {
    id: "ORD003",
    date: "2023-11-01",
    seller: "Kumar Kirana Store",
    items: 8,
    amount: 3500,
    status: "Pending",
  },
  {
    id: "ORD004",
    date: "2023-11-02",
    seller: "Singh Electronics",
    items: 1,
    amount: 25000,
    status: "Pending",
  },
  {
    id: "ORD005",
    date: "2023-11-04",
    seller: "Goyal Groceries",
    items: 12,
    amount: 1800,
    status: "Delivered",
  },
];

// Status tab mapping
const statusTabs = ["All", "Pending", "Shipped", "Delivered"];

// Status chip styles
const statusColors = {
  Delivered: { color: "success", label: "Delivered" },
  Shipped: { color: "primary", label: "Shipped" },
  Pending: { color: "default", label: "Pending" },
};

export default function MyOrders() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [orders, setOrders] = useState(initialOrders);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOrderId, setMenuOrderId] = useState(null);

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter orders based on tab
  const filteredOrders =
    selectedTab === 0
      ? orders
      : orders.filter((order) => order.status === statusTabs[selectedTab]);

  // Handle menu open/close
  const handleMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setMenuOrderId(orderId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOrderId(null);
  };

  // Edit handler: open dialog with order data
  const handleEdit = () => {
    const order = orders.find((o) => o.id === menuOrderId);
    setEditOrder(order);
    setEditDialogOpen(true);
    handleMenuClose();
  };

  // Save edited order
  const handleEditSave = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === editOrder.id ? { ...editOrder } : order
      )
    );
    setEditDialogOpen(false);
    setEditOrder(null);
  };

  // Delete handler
  const handleDelete = () => {
    setOrders((prev) => prev.filter((order) => order.id !== menuOrderId));
    handleMenuClose();
  };

  // Handle edit dialog field change
  const handleEditFieldChange = (field, value) => {
    setEditOrder((prev) => ({
      ...prev,
      [field]: field === "amount" || field === "items" ? Number(value) : value,
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#f8fafc",
        px: { xs: 2, sm: 4, md: 7, lg: 12 },
        py: { xs: 2, sm: 4, md: 5 },
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          paddingRight: "10px",
          boxSizing: "border-box",
        }}
      >
        {/* Heading */}
        <Typography
          fontWeight={700}
          fontSize={{ xs: 22, md: 28 }}
          sx={{ mb: { xs: 2, md: 3 }, color: "#22364a" }}
        >
          My Orders
        </Typography>

        {/* Status Tabs */}
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          sx={{
            minHeight: 0,
            mb: { xs: 2, md: 3 },
            width: "100%",
            maxWidth: 720,
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
              color: "#f5f6f8 !important",
            },
          }}
        >
          {statusTabs.map((st) => (
            <Tab key={st} label={st} />
          ))}
        </Tabs>

        {/* Order History Table Card */}
        <Box
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: 0,
            background: "#fff",
            border: "1px solid #ededed",
            p: { xs: 1, sm: 2.5, md: 3 },
            mt: { xs: 1, md: 2 },
            width: "100%",
            overflowX: "auto",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={20}
            color="#22364a"
            sx={{ mb: 0.5, width: "100%" }}
          >
            Order History
          </Typography>
          <Typography
            color="#8b99a8"
            fontSize={14}
            sx={{ mb: 2, width: "100%" }}
          >
            A list of all your orders from various sellers.
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Order ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Seller
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Items
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Amount (₹)
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: "#22364a" }}>
                    Actions
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.seller}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={statusColors[order.status].label}
                        color={statusColors[order.status].color}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: 14,
                          px: 1,
                          background:
                            order.status === "Delivered"
                              ? "#22c55e"
                              : order.status === "Shipped"
                              ? "#e0e7ff"
                              : "#f3f4f6",
                          color:
                            order.status === "Delivered"
                              ? "#fff"
                              : order.status === "Shipped"
                              ? "#22364a"
                              : "#22364a",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, order.id)}
                        aria-label="Actions"
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && menuOrderId === order.id}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography color="#888" fontWeight={500} fontSize={18}>
                        No orders found for this status.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          {editOrder && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField
                label="Order ID"
                value={editOrder.id}
                disabled
                fullWidth
              />
              <TextField
                label="Date"
                value={editOrder.date}
                onChange={(e) => handleEditFieldChange("date", e.target.value)}
                fullWidth
              />
              <TextField
                label="Seller"
                value={editOrder.seller}
                onChange={(e) =>
                  handleEditFieldChange("seller", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Items"
                type="number"
                value={editOrder.items}
                onChange={(e) => handleEditFieldChange("items", e.target.value)}
                fullWidth
              />
              <TextField
                label="Amount (₹)"
                type="number"
                value={editOrder.amount}
                onChange={(e) =>
                  handleEditFieldChange("amount", e.target.value)
                }
                fullWidth
              />
              <TextField
                label="Status"
                select
                value={editOrder.status}
                onChange={(e) =>
                  handleEditFieldChange("status", e.target.value)
                }
                fullWidth
              >
                {statusTabs.slice(1).map((st) => (
                  <MenuItem key={st} value={st}>
                    {st}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
