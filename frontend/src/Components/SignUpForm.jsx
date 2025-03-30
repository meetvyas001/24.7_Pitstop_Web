import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  InputAdornment,
} from "@mui/material";
import { AccountCircle, Lock, Phone, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/sign-up`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        contactNumber: data.contactNumber,
      });
      Swal.fire({ title: "Registration Successful", icon: "success", confirmButtonText: "OK" }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      Swal.fire({ title: "Error", text: "Registration failed", icon: "error", confirmButtonText: "OK" });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>
      <Container maxWidth="xs">
        <motion.div initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, backgroundColor: "#fff", textAlign: "center" }}>
            <Box sx={{ marginBottom: 2 }}>
              <img src="/Pitstop.png" alt="Logo" width={120} />
            </Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>Sign Up</Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                {...register("firstName", { required: "First name is required" })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment> }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><Lock /></InputAdornment> }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Contact Number"
                variant="outlined"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: { value: /^[0-9]{10}$/, message: "Invalid contact number" },
                })}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber?.message}
                InputProps={{ startAdornment: <InputAdornment position="start"><Phone /></InputAdornment> }}
                sx={{ mb: 2 }}
              />
              <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2, borderRadius: 2, backgroundColor: "#ff4b5c", "&:hover": { backgroundColor: "#c0392b" } }}>Sign Up</Button>
              <Typography variant="body2" sx={{ mt: 2, color: "#333" }}>
                Already have an account? <Link to="/login" style={{ textDecoration: "none", color: "#ff4b5c" }}>Sign In</Link>
              </Typography>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SignUpForm;