import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import GarageIcon from "@mui/icons-material/Build";
import { motion } from "framer-motion";

const MechanicSignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data) => {
    console.log("FormData:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth-user/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log("Mechanic signInData:", response.data.data.user._id);
      const mdata = { mechanicId: response.data.data.user._id };
      localStorage.setItem(
        "MechanicaccessToken",
        response?.data?.data?.accessToken
      );
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/mechanic/dashboard", { state: mdata });
      });
    } catch (err) {
      console.log("Error", err);
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2a2a2a, #ff3d00, #ff9e00)"
      }}
    >
      <Container maxWidth="xs">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundColor: "#2c2c2c",
              color: "#ffcc00",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <GarageIcon sx={{ fontSize: 50, color: "#ffcc00" }} />
            </Box>
            <Typography variant="h5" align="center" gutterBottom>
              Mechanic Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#ffcc00" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      input: { color: "#ffcc00" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#ffcc00",
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#ff9900",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ffcc00",
                        },
                      },
                      "& .MuiInputLabel-root": { color: "#ffcc00" },
                      "& .Mui-focused": { color: "#ffcc00" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#ffcc00" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? (
                              <VisibilityOff sx={{ color: "#ffcc00" }} />
                            ) : (
                              <Visibility sx={{ color: "#ffcc00" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      input: { color: "#ffcc00" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "#ffcc00",
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: "#ff9900",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#ffcc00",
                        },
                      },
                      "& .MuiInputLabel-root": { color: "#ffcc00" },
                      "& .Mui-focused": { color: "#ffcc00" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#ffcc00",
                      color: "black",
                      mt: 2,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#ff9900",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  to="/mechanic/register"
                  style={{ textDecoration: "none", color: "#ffcc00" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MechanicSignInForm;
