import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Services = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const access = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/service/all`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setServices(response?.data?.data || []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (id, price) => {
    navigate("/register/problem", { state: { serviceId: id, price } });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          zIndex: 1100,
        }}
      >
        <Toolbar>
          <Navbar />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, backgroundColor: "#f4f6f8", py: 6, px: isMobile ? 2 : 4 }}>
        <Container>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            textAlign="center"
            sx={{ fontWeight: "bold", mb: 8, color: "#222" }}
          >
            Our Services
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography textAlign="center" color="error">
              {error}
            </Typography>
          ) : services.length > 0 ? (
            <Grid container spacing={8} justifyContent="center">
  {services.map((service) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={service._id}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      
      <Card
  sx={{
    width: "100%",
    maxWidth: 360,
    p: 3,
    pt: 10, // Reduced from 12
    borderRadius: 4,
    backgroundColor: "white",
    boxShadow: 4,
    position: "relative",
    overflow: "visible",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: 8,
    },
  }}
>
  {/* Floating Image */}
  <Box
    component="img"
    src={service.imageUrl}
    alt={service.title}
    sx={{
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      position: "absolute",
      top: "-40px", // Moved image down
      left: "50%",
      transform: "translateX(-50%)",
      border: "4px solid white",
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      backgroundColor: "#fff",
      zIndex: 1,
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateX(-50%) scale(1.1)",
      },
    }}
  />

        <CardContent sx={{ textAlign: "center", mt: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", mb: 1 }}>
            {service.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
            {service.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mb: 2 }}>
            ₹{service.price}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleBookNow(service._id, service.price)}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              fontWeight: "bold",
              py: 1,
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Book Now
          </Button>

        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

          ) : (
            <Typography textAlign="center" color="textSecondary">
              No services available at the moment.
            </Typography>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Services;



