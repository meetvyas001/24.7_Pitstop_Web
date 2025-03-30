import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "We provide a wide range of book-related services, including buying, selling, delivery, and user support. You can also schedule problem reports and consultations.",
  },
  {
    question: "How do I book a service?",
    answer:
      "Simply go to the 'Services' page, choose the service you need, and click the 'Book Now' button. You’ll be redirected to a form to complete the process.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule your booking from your user dashboard under the 'My Orders' section, subject to our cancellation policy.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use the 'Contact Us' or 'Feedback' section in your dashboard to reach our support team. We typically respond within 24 hours.",
  },
];

const FaqSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Navbar />

      {/* FAQ Content */}
      <Box sx={{ flexGrow: 1, py: 8, backgroundColor: "#f9f9f9" }}>
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? "h5" : "h4"}
            textAlign="center"
            fontWeight="bold"
            mb={5}
          >
            Frequently Asked Questions
          </Typography>

          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "#fff",
                mb: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
                borderRadius: 2,
                "&:hover": {
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
                  transform: "scale(1.01)",
                  transition: "0.3s ease",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#000" }} />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography fontWeight="bold" color="#333">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="#555">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default FaqSection;
