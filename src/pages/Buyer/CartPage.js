import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useCart } from "./CartContext";

const GST_PERCENT = 0.18;
const CASH_DISCOUNT = 0.05;

export default function CartPage() {
  const { cart, setQty, removeFromCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [payment, setPayment] = useState("cash");

  let total = cart.reduce((sum, item) => {
    const subtotal = item.price * item.qty;
    const gst = Math.round(subtotal * GST_PERCENT);
    return sum + subtotal + gst;
  }, 0);

  let discount = payment === "cash" ? Math.floor(total * CASH_DISCOUNT) : 0;
  let grandTotal = total - discount;

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
      <Paper
        sx={{
          width: "100%",
          maxWidth: 1100,
          borderRadius: 4,
          mx: "auto",
          my: 1,
          p: { xs: 1.5, sm: 4, md: 6 },
          minHeight: 350,
          boxShadow: "0 2px 14px 0 rgba(36,50,93,0.09)",
        }}
      >
        <Typography fontSize={{ xs: 24, sm: 28 }} fontWeight={700} mb={2}>
          Cart
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Original Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Price + GST = Total
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => {
                const subtotal = item.price * item.qty;
                const gst = Math.round(subtotal * GST_PERCENT);
                return (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>₹{item.price * item.qty}</TableCell>
                    <TableCell>
                      ₹{item.price * item.qty} + {Math.round(GST_PERCENT * 100)}
                      % = <b>₹{subtotal + gst}</b>
                      <span
                        style={{ color: "#666", fontSize: 13, fontWeight: 400 }}
                      >
                        {" "}
                        (Price + GST)
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        disabled={item.qty === 1}
                        sx={{
                          background: item.qty === 1 ? "#ccc" : "#eee",
                          color: "#474747",
                          mx: 0.5,
                          "&:hover":
                            item.qty === 1 ? {} : { background: "#ddd" },
                          width: 32,
                          height: 32,
                        }}
                        onClick={() =>
                          item.qty > 1 && setQty(item.name, item.qty - 1)
                        }
                      >
                        <Remove />
                      </IconButton>
                      <Typography
                        component="span"
                        sx={{
                          mx: 1.1,
                          display: "inline-block",
                          minWidth: 18,
                          textAlign: "center",
                        }}
                      >
                        {item.qty}
                      </Typography>
                      <IconButton
                        sx={{
                          background: "#2961e1",
                          color: "#fff",
                          mx: 0.5,
                          "&:hover": { background: "#1146aa" },
                          width: 32,
                          height: 32,
                        }}
                        onClick={() => setQty(item.name, item.qty + 1)}
                      >
                        <Add />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          background: "#3066be",
                          color: "#22364a",
                          fontWeight: 700,
                          px: 2,
                          fontSize: 15,
                          textTransform: "none",
                          "&:hover": { background: "#3066be" },
                        }}
                        onClick={() => removeFromCart(item.name)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Bottom summary */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "flex-start" : "center"}
          justifyContent={isMobile ? "flex-start" : "flex-end"}
          gap={2}
          mt={4}
          flexWrap="wrap"
        >
          <Box flex={1}>
            <Typography sx={{ color: "#2961e1", fontWeight: 700, mb: 0.7 }}>
              Payment Type:{" "}
              <span style={{ color: "#00923f" }}>
                {payment}
                {payment === "cash" && (
                  <>
                    {" "}
                    <span style={{ color: "#059b37" }}>
                      (Discount 5% Applied)
                    </span>
                  </>
                )}
              </span>
            </Typography>
            <Select
              value={payment}
              sx={{
                minWidth: 100,
                background: "#fff",
                borderRadius: 1,
                mt: 0.5,
              }}
              onChange={(e) => setPayment(e.target.value)}
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="credit">Credit</MenuItem>
              <MenuItem value="upi">UPI</MenuItem>
            </Select>
          </Box>
          <Box
            flex={1}
            display={isMobile ? "block" : "flex"}
            flexDirection="column"
            alignItems="flex-end"
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "#2961e1",
                fontSize: { xs: 17, sm: 22 },
                mb: 1,
                textAlign: isMobile ? "left" : "right",
              }}
            >
              Total: ₹{grandTotal}
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: "#3066be",
                color: "#22364a",
                fontWeight: 700,
                px: 4,
                py: 1.3,
                fontSize: 17,
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { background: "#3066be" },
              }}
            >
              Send Enquiry / purchase order
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
