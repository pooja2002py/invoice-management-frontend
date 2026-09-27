import React, { useEffect, useState } from "react";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

import { logout, me } from "../services/authService";


export default function Header({ onMenu }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);


  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await me();
        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );
      }
    };

    loadUser();
  }, []);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  const displayName =
    user?.first_name ||
    user?.username ||
    "Administrator";


  const avatarLetter =
    displayName.charAt(0).toUpperCase();


  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "#fff",
        color: "#123f60",
        borderBottom: "1px solid #e3e9ee",
        zIndex: 1200,
      }}
    >
      <Toolbar>

        {/* Mobile Menu Button */}

        <IconButton
          onClick={onMenu}
          sx={{
            display: {
              md: "none",
            },
            mr: 1,
          }}
        >
          <MenuIcon />
        </IconButton>


        {/* Application Title */}

        <Typography
          fontWeight={800}
          sx={{
            flexGrow: 1,
          }}
        >
          Invoice Management
        </Typography>


        {/* User Avatar */}

        <Avatar
          sx={{
            width: 34,
            height: 34,
            bgcolor: "#eaf3f8",
            color: "#16689b",
            mr: 1,
          }}
        >
          {avatarLetter}
        </Avatar>


        {/* User Information */}

        <Box
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            mr: 2,
          }}
        >
          <Typography
            fontSize={13}
            fontWeight={700}
          >
            {displayName}
          </Typography>

          <Typography
            fontSize={10}
            color="text.secondary"
          >
            Ultrakey IT Solutions
          </Typography>
        </Box>


        {/* Logout */}

        <Button onClick={handleLogout}>
          Logout
        </Button>

      </Toolbar>
    </AppBar>
  );
}