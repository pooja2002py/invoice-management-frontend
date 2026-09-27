import React from "react";
import ReactDOM from "react-dom/client";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import App from "./App";
import "./styles.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16689b",
    },
    secondary: {
      main: "#123f60",
    },
  },

  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #e5ebef",
          boxShadow:
            "0 5px 18px rgba(20,55,80,.05)",
        },
      },
    },
  },
});

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);