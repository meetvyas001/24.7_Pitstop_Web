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
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { email: data.email, password: data.password }
      );
      localStorage.setItem("userId", response?.data?.data?._id);
      localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      Swal.fire({ title: "Login Successful", icon: "success", confirmButtonText: "OK" }).then(() => {
        navigate("/");
      });
    } catch (err) {
      Swal.fire({ title: "Error", text: "Invalid Credentials", icon: "error", confirmButtonText: "OK" });
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>
      <Container maxWidth="xs">
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, backgroundColor: "#fff", textAlign: "center" }}>
            <Box sx={{ marginBottom: 2 }}>
              <img src="/Pitstop.png" alt="Logo" width={120} />
            </Box>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                type={showPassword ? "text" : "password"}
                variant="outlined"
                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock /></InputAdornment>,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2, borderRadius: 2, backgroundColor: "#ff4b5c", "&:hover": { backgroundColor: "#c0392b" } }}>Sign In</Button>
              <Typography variant="body2" sx={{ mt: 2, color: "#333" }}>
                Don't have an account? <Link to="/register" style={{ textDecoration: "none", color: "#ff4b5c" }}>Sign Up</Link>
              </Typography>
            </form>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SignInForm