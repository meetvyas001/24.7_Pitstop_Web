import React from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  createTheme,
  Box,
  Grid,
} from "@mui/material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h4: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
      fontWeight: 600,
      fontSize: "2rem",
    },
  },
  palette: {
    primary: {
      main: "#1E3A8A",
    },
    secondary: {
      main: "#F59E0B",
    },
    background: {
      default: "#F9FAFB",
    },
  },
});

const serviceHistory = [
  {
    date: "2025-02-01",
    service: "Oil Change",
    mechanic: "John Doe",
    cost: 50,
    notes: "Changed oil and filter",
  },
  {
    date: "2025-01-15",
    service: "Brake Repair",
    mechanic: "Jane Smith",
    cost: 200,
    notes: "Replaced brake pads",
  },
];

const ServiceHistory = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh", // Ensure the content spans the full height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "30px 10%",
            marginBottom: "50px",
            flexGrow: 1, // Ensure content grows to take space between navbar and footer
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Service History
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 3, // Adding shadow for modern design
                borderRadius: "8px",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Mechanic</TableCell>
                    <TableCell>Cost ($)</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceHistory.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.service}</TableCell>
                      <TableCell>{entry.mechanic}</TableCell>
                      <TableCell>{entry.cost}</TableCell>
                      <TableCell>{entry.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Footer
          sx={{
            marginTop: "auto", // Push footer to the bottom
            padding: "20px 0", // Space between footer and content
            backgroundColor: theme.palette.primary.main,
            color: "#fff",
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default ServiceHistory;
