import React from "react";

import { NavLink } from "react-router-dom";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PaymentsIcon from "@mui/icons-material/Payments";
import SettingsIcon from "@mui/icons-material/Settings";

const items = [
  ["/", "Dashboard", DashboardIcon],
  ["/clients", "Clients", PeopleIcon],
  ["/invoices", "Invoices", ReceiptLongIcon],
  ["/quotes", "Quotes", RequestQuoteIcon],
  ["/payments", "Payments", PaymentsIcon],
  ["/settings", "Settings", SettingsIcon],
];

export default function Sidebar({ onNavigate }) {
  return (
    <Box
      sx={{
        height: "100%",
        background: "#123f60",
        color: "#fff",
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2.5 }}>
        <img
          src="/ultrakey-logo.svg"
          alt="Ultrakey Logo"
          style={{
            width: "100%",
            background: "#fff",
            borderRadius: 6,
          }}
        />

        <Typography
          sx={{
            fontSize: 10,
            opacity: 0.7,
            mt: 1,
            textAlign: "center",
          }}
        >
          INVOICE MANAGEMENT SYSTEM
        </Typography>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,.15)",
        }}
      />

      {/* Navigation */}
      <List sx={{ p: 1 }}>
        {items.map(([to, label, Icon]) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            end={to === "/"}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: "#dce9f2",

              "&.active": {
                background: "#286b98",
                color: "#fff",
              },

              "&:hover": {
                background:
                  "rgba(255,255,255,.09)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: 40,
              }}
            >
              <Icon />
            </ListItemIcon>

            <ListItemText
              primary={label}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}