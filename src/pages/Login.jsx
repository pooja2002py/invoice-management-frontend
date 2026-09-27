import React, { useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { login } from "../services/authService";


export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/");
    } catch (ex) {
      setError(
        ex.response?.data?.detail ||
        "Invalid username or password"
      );
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(135deg, #123f60, #16689b)",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 440,
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>

          {/* Logo & Title */}

          <Box textAlign="center" mb={3}>
            <Box
              component="img"
              src="/ultrakey-logo.svg"
              alt="Ultrakey Logo"
              sx={{
                width: 180,
                height: 70,
                objectFit: "contain",
                display: "block",
                mx: "auto",
                mb: 1,
              }}
            />

            <Typography
              variant="h5"
              fontWeight={900}
              color="#123f60"
            >
              Invoice Management System
            </Typography>

            <Typography color="text.secondary">
              Ultrakey IT Solutions Private Limited
            </Typography>
          </Box>


          {/* Error */}

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}


          {/* Login Form */}

          <form onSubmit={handleSubmit}>

            <TextField
              fullWidth
              label="Username"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>

          </form>


          {/* Sign Up Link */}

          <Box
            textAlign="center"
            mt={2}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Don't have an account?{" "}

              <Link
                to="/signup"
                style={{
                  color: "#1976a8",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}