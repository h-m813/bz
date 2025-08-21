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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Demo order data for the UI
const orders = [
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Filter orders based on tab
  const filteredOrders =
    selectedTab === 0
      ? orders
      : orders.filter((order) => order.status === statusTabs[selectedTab]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1600px",
        mx: "auto",
        pt: { xs: 2, md: 3 },
        pb: { xs: 3, md: 5 },
        px: { xs: 1, sm: 2, md: 4, lg: 8 },
      }}
    >
      {/* Heading */}
      <Typography
        fontWeight={700}
        fontSize={{ xs: 24, md: 32 }}
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
            color: "#f5f6f8",
          },
        }}
      >
        {statusTabs.map((st, idx) => (
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
          pr: { xs: 1, sm: 2, md: 3, lg: 8 },
          width: "80%",
          overflowX: "auto",
        }}
      >
        <Typography
          fontWeight={700}
          fontSize={19}
          color="#22364a"
          sx={{ mb: 0.5 }}
        >
          Order History
        </Typography>
        <Typography color="#8b99a8" fontSize={14} sx={{ mb: 2 }}>
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
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
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
  );
}
