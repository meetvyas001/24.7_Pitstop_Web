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
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Email, Lock, Person, Store, Phone } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import GarageIcon from "@mui/icons-material/Build";
import { motion } from "framer-motion";

const MechanicSignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("signUpData", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth-user/sign-up`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          shopName: data.shopName,
          email: data.email,
          password: data.password,
          contactNumber: data.contactNumber,
          lat: 23.024181,
          lng: 72.558283,
        }
      );
      Swal.fire({
        title: "Registration Successful!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/mechanic/login");
      });
    } catch (err) {
      Swal.fire({
        title: "Error Registering Mechanic",
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
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
              Mechanic Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                {["firstName", "lastName", "shopName", "email", "contactNumber", "password"].map(
                  (field, index) => (
                    <Grid item xs={12} key={index}>
                      <TextField
                        fullWidth
                        label={
                          field === "firstName"
                            ? "First Name"
                            : field === "lastName"
                            ? "Last Name"
                            : field === "shopName"
                            ? "Shop Name"
                            : field === "email"
                            ? "Email"
                            : field === "contactNumber"
                            ? "Contact Number"
                            : "Password"
                        }
                        type={field === "password" ? "password" : "text"}
                        variant="outlined"
                        {...register(field, {
                          required: `$ {
                          field === "firstName"
                          ? "First Name"
                          : field === "lastName"
                          ? "Last Name"
                          : field === "shopName"
                          ? "Shop Name"
                          : field === "email"
                          ? "Email"
                          : field === "contactNumber"
                          ? "Contact Number"
                          : "Password"
                          } is required`,
                          pattern:
                            field === "email"
                              ? {
                                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                                  message: "Invalid email address",
                                }
                              : field === "contactNumber"
                              ? {
                                  value: /^[0-9]{10}$/, 
                                  message: "Invalid contact number",
                                }
                              : undefined,
                        })}
                        error={!!errors[field]}
                        helperText={errors[field] ? errors[field].message : ""}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {field === "firstName" || field === "lastName" ? (
                                <Person sx={{ color: "#ffcc00" }} />
                              ) : field === "shopName" ? (
                                <Store sx={{ color: "#ffcc00" }} />
                              ) : field === "email" ? (
                                <Email sx={{ color: "#ffcc00" }} />
                              ) : field === "contactNumber" ? (
                                <Phone sx={{ color: "#ffcc00" }} />
                              ) : (
                                <Lock sx={{ color: "#ffcc00" }} />
                              )}
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
                        }}
                      />
                    </Grid>
                  )
                )}
                <Grid item xs={12}>
                  <Button type="submit" fullWidth variant="contained" size="large" sx={{ backgroundColor: "#ffcc00", color: "black", mt: 2, borderRadius: 2, "&:hover": { backgroundColor: "#ff9900" } }}>
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Already Registered? <Link to="/mechanic/login" style={{ textDecoration: "none", color: "#ffcc00" }}>Sign In</Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default MechanicSignUpForm;