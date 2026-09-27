import React, { useState } from "react";

import { Box, Drawer } from "@mui/material";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  // Open mobile sidebar
  const handleOpenMenu = () => {
    setOpen(true);
  };

  // Close mobile sidebar
  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f7fa",
      }}
    >
      {/* ================= HEADER ================= */}
      <Header onMenu={handleOpenMenu} />

      {/* ================= MOBILE SIDEBAR ================= */}
      <Drawer
        open={open}
        onClose={handleCloseMenu}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        <Box
          sx={{
            width: 245,
            height: "100%",
          }}
        >
          <Sidebar onNavigate={handleCloseMenu} />
        </Box>
      </Drawer>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 64,
          bottom: 0,
          width: 245,
          display: {
            xs: "none",
            md: "block",
          },
          overflowY: "auto",
        }}
      >
        <Sidebar />
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Box
        component="main"
        sx={{
          ml: {
            xs: 0,
            md: "245px",
          },

          // Left & Right spacing
          px: {
            xs: 2,
            sm: 3,
            lg: 4,
          },

          // Header खाली content साठी space
          pt: {
            xs: "88px",
            sm: "96px",
            lg: "104px",
          },

          // Bottom spacing
          pb: {
            xs: 2,
            sm: 3,
            lg: 4,
          },

          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}