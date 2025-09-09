import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Card,
  CardContent,
  Stack,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/slices/ordersSlice";

const statusColor = (status) =>
  ({
    Delivered: "success",
    Pending: "warning",
    Shipped: "info",
  }[status] || "default");

const statusBgColor = (status) =>
  ({
    Delivered: "#e6f7ee",
    Pending: "#fff8e1",
    Shipped: "#e6f0fa",
  }[status] || "#f6f8fa");

export default function Order() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const { orders, tabs, activeTabIndex } = useSelector((state) => state.orders);
  const filteredOrders = orders.filter(tabs[activeTabIndex].filter);

  // Actions menu logic
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionOrderId, setActionOrderId] = useState(null);

  // Edit dialog logic
  const [openEdit, setOpenEdit] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const handleActionsMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActionOrderId(id);
  };
  const handleActionsMenuClose = () => {
    setAnchorEl(null);
    setActionOrderId(null);
  };

  const handleEditOpen = (order) => {
    setEditOrder(order);
    setOpenEdit(true);
    handleActionsMenuClose();
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    setEditOrder(null);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // You can dispatch an update action here if needed
    handleEditClose();
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
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          Manage Orders
        </Typography>
        <Tabs
          value={activeTabIndex}
          onChange={(_e, newIndex) => dispatch(setActiveTab(newIndex))}
          variant={isMobile ? "scrollable" : "standard"}
          allowScrollButtonsMobile
          sx={{ mb: 2, minHeight: "36px" }}
        >
          {tabs.map((t, i) => (
            <Tab
              key={t.label}
              label={`${t.label} ${
                t.label === "All"
                  ? `(${orders.length})`
                  : `(${orders.filter(t.filter).length})`
              }`}
              sx={{
                fontSize: 15,
                minHeight: "36px",
                minWidth: 90,
                bgcolor:
                  activeTabIndex === i ? statusBgColor(t.label) : "inherit",
                color: activeTabIndex === i ? "#1344a4" : "inherit",
                fontWeight: activeTabIndex === i ? 700 : 600,
                borderRadius: 2,
                transition: "background 0.2s",
              }}
            />
          ))}
        </Tabs>

        {!isMobile ? (
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              boxShadow: "0 2px 8px #e8eaed",
              mb: 2,
              overflowX: "auto",
            }}
          >
            <Box sx={{ p: 2, pb: 0 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#24292f" }}
              >
                All Orders
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6c757d", fontSize: 13, mt: 0.5, mb: 1 }}
              >
                A list of all orders received.
              </Typography>
            </Box>
            <TableContainer>
              <Table sx={{ minWidth: 720 }}>
                <TableHead>
                  <TableRow sx={{ background: "#f6f8fa" }}>
                    <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Buyer</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Amount (₹)</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      hover
                      sx={{
                        background: statusBgColor(order.status),
                        transition: "background 0.2s",
                      }}
                    >
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 180,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order.buyer}
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={statusColor(order.status)}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            letterSpacing: 0.2,
                            fontSize: 13,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => handleActionsMenuOpen(e, order.id)}
                          size="small"
                          sx={{ p: 0.5 }}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={actionOrderId === order.id && Boolean(anchorEl)}
                          onClose={handleActionsMenuClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            sx: {
                              minWidth: 120,
                              borderRadius: 2,
                              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => handleEditOpen(order)}
                            sx={{
                              fontSize: 15,
                              px: 2,
                              py: 1,
                              minHeight: 36,
                            }}
                          >
                            <ListItemIcon>
                              <EditIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : (
          <Box px={2}>
            <Stack spacing={2}>
              {filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    boxShadow: "0 1px 6px #f2f3f5",
                    background: statusBgColor(order.status),
                    transition: "background 0.2s",
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      spacing={2}
                      sx={{ mb: 1 }}
                    >
                      <Typography fontWeight={700} sx={{ fontSize: 16 }}>
                        {order.id}
                      </Typography>
                      <Chip
                        label={order.status}
                        color={statusColor(order.status)}
                        size="small"
                        sx={{ fontWeight: 700, fontSize: 13 }}
                      />
                      <IconButton
                        onClick={(e) => handleActionsMenuOpen(e, order.id)}
                        size="small"
                        sx={{ p: 0.5 }}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={actionOrderId === order.id && Boolean(anchorEl)}
                        onClose={handleActionsMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        PaperProps={{
                          sx: {
                            minWidth: 120,
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() => handleEditOpen(order)}
                          sx={{
                            fontSize: 15,
                            px: 2,
                            py: 1,
                            minHeight: 36,
                          }}
                        >
                          <ListItemIcon>
                            <EditIcon fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText>Edit</ListItemText>
                        </MenuItem>
                      </Menu>
                    </Stack>
                    <Divider sx={{ mb: 1 }} />
                    <Stack spacing={0.75}>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Buyer:</b> {order.buyer}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Date:</b> {order.date}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Items:</b> {order.items}
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        <b>Amount:</b> ₹{order.amount.toLocaleString()}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}

        {/* Edit Order Dialog */}
        <Dialog
          open={openEdit}
          onClose={handleEditClose}
          fullWidth
          maxWidth="sm"
          scroll="body"
        >
          <DialogTitle>Edit Order</DialogTitle>
          <DialogContent dividers sx={{ px: { xs: 1, sm: 3 }, py: 2 }}>
            {editOrder && (
              <Box
                component="form"
                onSubmit={handleEditSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="Order ID"
                  name="id"
                  value={editOrder.id}
                  disabled
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Date"
                  name="date"
                  value={editOrder.date}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Buyer"
                  name="buyer"
                  value={editOrder.buyer}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Items"
                  name="items"
                  value={editOrder.items}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Amount"
                  name="amount"
                  value={editOrder.amount}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                  type="number"
                />
                <TextField
                  label="Status"
                  name="status"
                  value={editOrder.status}
                  onChange={handleEditChange}
                  fullWidth
                  size="small"
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              color="primary"
              variant="contained"
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
