import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || {}; // Extract amount from navigation state

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [upiModalOpen, setUpiModalOpen] = useState(false); // State for UPI modal

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded || !window.Razorpay) {
      Swal.fire("Error", "Razorpay SDK is not loaded yet. Please wait.", "error");
      return;
    }

    const options = {
      key: "rzp_test_fzhcmdZ1GJaisr",
      amount: amount * 100, // Convert INR to paise
      currency: "INR",
      name: "24/7 PitStop",
      description: "Vehicle Repair Service Payment",
      image: "/assets/logo.png",
      handler: function (response) {
        Swal.fire({
          title: "Payment Successful!",
          text: `Payment ID: ${response.razorpay_payment_id}`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/profile");
        });
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9876543210",
      },
      theme: {
        color: "#1976D2",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleUpiPayment = () => {
    setUpiModalOpen(true); // Open UPI modal
  };

  const handleCloseUpiModal = () => {
    setUpiModalOpen(false); // Close UPI modal
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Pay Securely with Razorpay
          </Typography>
          <Typography variant="h6" color="primary">
            Amount: ₹{amount}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, width: "100%" }}
            onClick={handleRazorpayPayment}
            disabled={!razorpayLoaded}
          >
            {razorpayLoaded ? "Pay Now" : "Loading..."}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: "100%" }}
            onClick={handleUpiPayment}
          >
            Pay using UPI
          </Button>
        </CardContent>
      </Card>

      {/* UPI Modal */}
      <Modal
        open={upiModalOpen}
        onClose={handleCloseUpiModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            width: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Scan the QR Code
          </Typography>
          <img
            src="/assets/UPI.jpeg" // Replace with your QR code image URL
            alt="UPI QR Code"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Scan this QR code to complete your payment.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleCloseUpiModal}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default PaymentPage;