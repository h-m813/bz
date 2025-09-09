import React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  setTabValue,
  setSearchValue,
} from "../../redux/slices/buyerNetworkSlice";

export default function BuyerNetwork() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const { buyers, tabValue, searchValue } = useSelector(
    (state) => state.buyerNetwork
  );

  // Filter buyers per tab and search
  const filteredBuyers =
    tabValue === 0
      ? buyers.filter(
          (b) =>
            b.status === "Connected" &&
            b.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : buyers.filter(
          (b) =>
            b.status === "Pending" &&
            b.name.toLowerCase().includes(searchValue.toLowerCase())
        ); // Show pending requests

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
          px: { xs: 1, sm: 3, md: 4 },
          boxSizing: "border-box",
        }}
      >
        {/* Title and Tabs */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ mb: 1, color: "#222" }}
          >
            Buyer Network
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_e, v) => dispatch(setTabValue(v))}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                minHeight: 32,
                "& .MuiTab-root": { minHeight: 32, fontWeight: 600 },
                mr: 2,
              }}
            >
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Connected&nbsp;
                    <Box
                      component="span"
                      sx={{
                        bgcolor: "#3066be",
                        color: "#fff",
                        borderRadius: 2,
                        px: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      {buyers.filter((b) => b.status === "Connected").length}
                    </Box>
                  </Box>
                }
                sx={{ fontSize: 15, px: 2 }}
              />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    Pending Requests&nbsp;
                    <Box
                      component="span"
                      sx={{
                        bgcolor: "#e5e5e5",
                        color: "#222",
                        borderRadius: 2,
                        px: 1,
                        fontSize: 12,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      {buyers.filter((b) => b.status === "Pending").length}
                    </Box>
                  </Box>
                }
                sx={{ fontSize: 15, px: 2 }}
              />
            </Tabs>
            <Box
              sx={{
                flex: 1,
                minWidth: isMobile ? "100%" : 240,
                ml: isMobile ? 0 : 1,
                mt: isMobile ? 1 : 0,
              }}
            >
              <input
                type="text"
                placeholder="Search buyers..."
                value={searchValue}
                onChange={(e) => dispatch(setSearchValue(e.target.value))}
                style={{
                  width: "100%",
                  fontSize: 15,
                  borderRadius: 6,
                  border: "1px solid #e0e0e0",
                  padding: "8px 12px",
                  outline: "none",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Buyers Grid */}
        <Grid
          container
          spacing={isMobile ? 3 : 4}
          justifyContent="center"
          sx={{ px: { xs: 1, sm: 0 } }}
        >
          {filteredBuyers.length === 0 ? (
            <Box sx={{ width: "100%", textAlign: "center", py: 6 }}>
              <Typography variant="body1" color="text.secondary">
                No buyers found.
              </Typography>
            </Box>
          ) : (
            filteredBuyers.map((buyer) => (
              <Grid key={buyer.name} item xs={12} sm={6} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    minWidth: 220,
                    maxWidth: 360,
                    background: "#fff",
                    transition: "box-shadow 0.18s",
                    boxShadow:
                      "0px 2px 8px rgba(48, 102, 190, 0.10), 0px 0.5px 1.5px #e5e8ef",
                    ":hover": {
                      boxShadow:
                        "0px 6px 24px rgba(48, 102, 190, 0.12), 0px 1.5px 3px #dde3ef",
                    },
                    mx: "auto",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      pb: 2,
                      pt: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: "50%",
                        bgcolor: "#ebebeb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "#667",
                        mb: 2,
                      }}
                    >
                      {buyer.initials}
                    </Box>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: "#232",
                        fontSize: 18,
                        textAlign: "center",
                      }}
                    >
                      {buyer.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#777",
                        mb: 2,
                        mt: 0.5,
                        textAlign: "center",
                      }}
                    >
                      {buyer.city}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: "#3066be", fontSize: 15, mb: 2 }}
                    >
                      Outstanding
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{
                        color: "#232",
                        mb: 2,
                        fontSize: 18,
                        letterSpacing: 0.5,
                      }}
                    >
                      ₹{buyer.outstanding.toFixed(2)}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: "#3066be",
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: 15,
                        boxShadow: "none",
                        py: 1,
                        "&:hover": { bgcolor: "#2959a6" },
                      }}
                      href={buyer.ledgerUrl}
                    >
                      View Ledger
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
