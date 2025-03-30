import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Grid, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const AdminSignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("formdata:", data);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem(
        "adminAccessToken",
        response?.data?.data?.accessToken
      );
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/admin/dashboard");
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
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg"
              alt="Login Illustration"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: 400,
                margin: "0 auto",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={6}
              sx={{ padding: 4, borderRadius: 3, backgroundColor: "#f9f9f9" }}
            >
              <Box sx={{ marginBottom: 4 }}>
                <img src="/assets/logo.png" alt="" width={190} />
              </Box>
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email address",
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      error={!!errors.password}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        marginTop: 2,
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "#ff0000",
                          color: "white",
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminSignInForm;
