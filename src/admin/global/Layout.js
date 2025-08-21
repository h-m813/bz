import { Box } from "@mui/material";
import React from "react";
import HeaderTop from "./HeaderTop";
import SidebarAdm from "./Sidebar";
// Adjust path as needed

const Layout =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <div
          style={{ display: "flex", minHeight: "100vh", flexDirection: "row" }}
        >
          <SidebarAdm />
          <Box
            sx={{
              width: "100%",
              bgcolor: "#fafafa",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <HeaderTop />
            <Box sx={{ p: 3, flex: 1 }}>
              <Component {...props} />
            </Box>
            {/* Footer fixed at bottom of content */}
          </Box>
        </div>
      </>
    );
  };

export default Layout;
