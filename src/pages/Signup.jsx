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

import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/authService";


export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");


    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }


    try {
      await register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });


      setSuccess(
        "Account created successfully. Redirecting to login..."
      );


      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (ex) {
      setError(
        ex.response?.data?.detail ||
        "Registration failed. Please try again."
      );
    }
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

            <Avatar
              src="/ultrakey-logo.svg"
              sx={{
                width: 100,
                height: 70,
                mx: "auto",
                bgcolor: "#fff",
              }}
            />

            <Typography
              variant="h5"
              fontWeight={900}
              color="#123f60"
            >
              Create Account
            </Typography>

            <Typography color="text.secondary">
              Invoice Management System
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


          {/* Success */}

          {success && (
            <Alert
              severity="success"
              sx={{ mb: 2 }}
            >
              {success}
            </Alert>
          )}


          {/* Signup Form */}

          <form onSubmit={handleSubmit}>

            <TextField
              fullWidth
              required
              label="Full Name"
              name="name"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />


            <TextField
              fullWidth
              required
              label="Username"
              name="username"
              margin="normal"
              value={formData.username}
              onChange={handleChange}
            />


            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />


            <TextField
              fullWidth
              label="Phone"
              name="phone"
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
            />


            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              name="password"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
            />


            <TextField
              fullWidth
              required
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
            />


            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                mt: 2,
                backgroundColor: "#1976a8",
              }}
            >
              Sign Up
            </Button>

          </form>


          {/* Login Link */}

          <Box
            textAlign="center"
            mt={3}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Already have an account?{" "}

              <Link
                to="/login"
                style={{
                  color: "#1976a8",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}