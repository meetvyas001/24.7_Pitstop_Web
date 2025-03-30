// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Button,
//   Box,
//   Paper,
// } from "@mui/material";

// const REACT_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

// const MechanicsSearchPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Extract mechanic details and price from location.state
//   const { mechanicsDetails, price } = location.state || {};
//   const { MechanicsDetails } = location.state;

//   // console.log("MechanicsSearchpage price from locaion", price);
//   const { firstName, lastName, lat, lng, shopName } =
//     mechanicsDetails?.MechanicsDetails || {};
//   const mechanicPrice = price?.price || "";

//   // console.log("searchMechanicsPage:", mechanicsDetails);
//   // console.log("first name", firstName);
//   // State to manage the selected mechanic
//   const [selectedMechanic, setSelectedMechanic] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: lat || 0,
//     lng: lng || 0,
//   });

//   // Update the selected mechanic's details and location
//   const handleMechanicClick = () => {
//     setSelectedMechanic(mechanicsDetails); // Update selected mechanic details
//     setSelectedLocation({ lat, lng }); // Update location for the map
//   };

//   const handleBooking = () => {
//     // Navigate to the payment page, passing the price
//     navigate("/payment", { state: { amount: mechanicPrice } });
//   };

//   useEffect(() => {
//     // If no mechanic details are found, navigate back or show a message
//     if (!mechanicsDetails) {
//       navigate("/search/mechanics");
//     }
//   }, [mechanicsDetails, navigate]);

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "80vh",
//         p: 3,
//       }}
//     >
//       <Grid container spacing={3} alignItems="center">
//         {/* Left Container - Google Map */}
//         <Grid item xs={12} md={7}>
//           <Card sx={{ height: "100%", boxShadow: 3 }}>
//             <CardContent>
//               <Typography variant="h5" gutterBottom>
//                 Mechanic Location
//               </Typography>
//               <iframe
//                 width="100%"
//                 height="400"
//                 style={{ border: 0 }}
//                 loading="lazy"
//                 allowFullScreen
//                 referrerPolicy="no-referrer-when-downgrade"
//                 src={`https://www.google.com/maps/embed/v1/place?key=${REACT_MAP_KEY}&q=${selectedLocation.lat},${selectedLocation.lng}&zoom=14`}
//               ></iframe>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Right Container - Mechanic Details */}
//         <Grid item xs={12} md={5}>
//           <Paper
//             sx={{
//               maxHeight: "400px",
//               overflowY: "auto",
//               p: 2,
//               borderRadius: 3,
//               boxShadow: 3,
//             }}
//           >
//             <Card
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 p: 2,
//                 m: 1,
//                 boxShadow: 2,
//                 borderRadius: 2,
//                 backgroundColor: selectedMechanic ? "black" : "white",
//                 color: selectedMechanic ? "white" : "black",
//                 cursor: "pointer", // Adding pointer cursor for clickable card
//               }}
//               onClick={handleMechanicClick}
//             >
//               <Avatar sx={{ bgcolor: "#1976D2", mr: 2 }}>
//                 {firstName ? firstName.charAt(0) : "M"}
//               </Avatar>
//               <Box sx={{ flex: 1 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}
//                 >
//                   {firstName} {lastName}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ fontFamily: "Arial, sans-serif" }}
//                 >
//                   {shopName ? shopName : "No shop name provided"}
//                 </Typography>

//                 <Typography
//                   variant="body1"
//                   sx={{
//                     fontWeight: "bold",
//                     mt: 1,
//                     fontFamily: "Arial, sans-serif",
//                   }}
//                 >
//                   Rs. {mechanicPrice}
//                 </Typography>
//               </Box>
//               <Button
//                 variant="contained"
//                 sx={{
//                   bgcolor: selectedMechanic ? "red" : "black",
//                   color: "white",
//                   "&:hover": {
//                     bgcolor: selectedMechanic ? "darkred" : "#333",
//                   },
//                 }}
//                 onClick={handleBooking}
//               >
//                 Book
//               </Button>
//             </Card>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MechanicsSearchPage;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Button,
//   Box,
//   Paper,
// } from "@mui/material";

// const REACT_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

// const MechanicsSearchPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Extract mechanic details and price from location.state
//   const { mechanicsDetails, price } = location.state || {};
//   const { MechanicsDetails } = location.state;

//   const { firstName, lastName, lat, lng, shopName } =
//     mechanicsDetails?.MechanicsDetails || {};
//   const mechanicPrice = price?.price || "";

//   // State to manage the selected mechanic
//   const [selectedMechanic, setSelectedMechanic] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState({
//     lat: lat || 0,
//     lng: lng || 0,
//   });

//   // Update the selected mechanic's details and location
//   const handleMechanicClick = () => {
//     setSelectedMechanic(mechanicsDetails); // Update selected mechanic details
//     setSelectedLocation({ lat, lng }); // Update location for the map
//   };

//   const handleBooking = () => {
//     // Navigate to the payment page, passing the price
//     navigate("/payment", { state: { amount: mechanicPrice } });
//   };

//   useEffect(() => {
//     // If no mechanic details are found, navigate back or show a message
//     if (!mechanicsDetails) {
//       navigate("/search/mechanics");
//     }
//   }, [mechanicsDetails, navigate]);

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh", // Full screen height for a more immersive view
//         background: "linear-gradient(135deg, #EFE7DA, #c1b6a4, #b29079)", // Gradient background with the requested colors
//         padding: 3,
//         boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
//         animation: "fadeIn 1.5s ease-in-out", // Adding fade-in animation on load
//       }}
//     >
//       <Grid container spacing={3} alignItems="center">
//         {/* Left Container - Google Map */}
//         <Grid item xs={12} md={7}>
//           <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 6, overflow: "hidden", animation: "scaleUp 0.8s ease-in-out" }}>
//             <CardContent>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: "bold",
//                   textAlign: "center",
//                   marginBottom: 2,
//                   color: "#333",
//                 }}
//               >
//                 Mechanic Location
//               </Typography>
//               <iframe
//                 width="100%"
//                 height="400"
//                 style={{ border: 0 }}
//                 loading="lazy"
//                 allowFullScreen
//                 referrerPolicy="no-referrer-when-downgrade"
//                 src={`https://www.google.com/maps/embed/v1/place?key=${REACT_MAP_KEY}&q=${selectedLocation.lat},${selectedLocation.lng}&zoom=14`}
//               ></iframe>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Right Container - Mechanic Details */}
//         <Grid item xs={12} md={5}>
//           <Paper
//             sx={{
//               maxHeight: "500px",
//               overflowY: "auto",
//               p: 3,
//               borderRadius: 3,
//               boxShadow: 3,
//               backgroundColor: "#fff",
//               transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//               "&:hover": {
//                 transform: "scale(1.05)",
//                 boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
//               },
//               animation: "fadeIn 1.5s ease-in-out", // Fade-in animation for the paper component
//             }}
//           >
//             <Card
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 p: 3,
//                 m: 1,
//                 boxShadow: 2,
//                 borderRadius: 2,
//                 backgroundColor: selectedMechanic ? "#1976D2" : "#fff",
//                 color: selectedMechanic ? "#fff" : "#333",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#1976D2",
//                   transform: "scale(1.05)",
//                 },
//               }}
//               onClick={handleMechanicClick}
//             >
//               <Avatar sx={{ bgcolor: "#1976D2", mr: 3, fontWeight: "bold", fontSize: "1.2rem" }}>
//                 {firstName ? firstName.charAt(0) : "M"}
//               </Avatar>
//               <Box sx={{ flex: 1 }}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Arial, sans-serif",
//                     fontSize: "1.1rem",
//                   }}
//                 >
//                   {firstName} {lastName}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{ fontFamily: "Arial, sans-serif", fontSize: "0.9rem" }}
//                 >
//                   {shopName ? shopName : "No shop name provided"}
//                 </Typography>

//                 <Typography
//                   variant="body1"
//                   sx={{
//                     fontWeight: "bold",
//                     mt: 2,
//                     fontFamily: "Arial, sans-serif",
//                     fontSize: "1.1rem",
//                   }}
//                 >
//                   Rs. {mechanicPrice}
//                 </Typography>
//               </Box>
//               <Button
//                 variant="contained"
//                 sx={{
//                   bgcolor: selectedMechanic ? "#f44336" : "#333",
//                   color: "white",
//                   "&:hover": {
//                     bgcolor: selectedMechanic ? "#e53935" : "#555",
//                   },
//                   padding: "10px 20px",
//                   fontSize: "1rem",
//                   borderRadius: "20px",
//                 }}
//                 onClick={handleBooking}
//               >
//                 Book Now
//               </Button>
//             </Card>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default MechanicsSearchPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
  Paper,
} from "@mui/material";

const REACT_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const MechanicsSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract mechanic details and price from location.state
  const { mechanicsDetails, price } = location.state || {};
  const { MechanicsDetails } = location.state;

  const { firstName, lastName, lat, lng, shopName } =
    mechanicsDetails?.MechanicsDetails || {};
  const mechanicPrice = price?.price || "";

  // State to manage the selected mechanic
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: lat || 0,
    lng: lng || 0,
  });

  // Update the selected mechanic's details and location
  const handleMechanicClick = () => {
    setSelectedMechanic(mechanicsDetails); // Update selected mechanic details
    setSelectedLocation({ lat, lng }); // Update location for the map
  };

  const handleBooking = () => {
    // Navigate to the payment page, passing the price
    navigate("/payment", { state: { amount: mechanicPrice } });
  };

  useEffect(() => {
    // If no mechanic details are found, navigate back or show a message
    if (!mechanicsDetails) {
      navigate("/search/mechanics");
    }
  }, [mechanicsDetails, navigate]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full screen height for a more immersive view
        background: "linear-gradient(135deg, #EFE7DA, #c1b6a4, #b29079)", // Gradient background with the requested colors
        padding: 3,
        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
        animation: "fadeIn 1.5s ease-in-out", // Adding fade-in animation on load
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Left Container - Google Map */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 6, overflow: "hidden", animation: "scaleUp 0.8s ease-in-out" }}>
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 2,
                  color: "#333",
                }}
              >
                Mechanic Location
              </Typography>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${REACT_MAP_KEY}&q=${selectedLocation.lat},${selectedLocation.lng}&zoom=14`}
              ></iframe>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Container - Mechanic Details */}
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              maxHeight: "500px",
              overflowY: "auto",
              p: 3,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#fff",
              transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
              },
              animation: "fadeIn 1.5s ease-in-out", // Fade-in animation for the paper component
            }}
          >
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                m: 1,
                boxShadow: 2,
                borderRadius: 2,
                backgroundColor: selectedMechanic ? "#1976D2" : "#fff",
                color: selectedMechanic ? "#fff" : "#333",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#1976D2",
                  transform: "scale(1.05)",
                },
              }}
              onClick={handleMechanicClick}
            >
              <Avatar sx={{ bgcolor: "#1976D2", mr: 3, fontWeight: "bold", fontSize: "1.2rem" }}>
                {firstName ? firstName.charAt(0) : "M"}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "1.1rem",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "Arial, sans-serif", fontSize: "0.9rem", color: "#666" }}
                >
                  {shopName ? shopName : "No shop name provided"}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    mt: 2,
                    fontFamily: "Arial, sans-serif",
                    fontSize: "1.1rem",
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  Rs. {mechanicPrice}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  bgcolor: selectedMechanic ? "#f44336" : "#333",
                  color: "white",
                  "&:hover": {
                    bgcolor: selectedMechanic ? "#e53935" : "#555",
                  },
                  padding: "10px 20px",
                  fontSize: "1rem",
                  borderRadius: "20px",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
                onClick={handleBooking}
              >
                Book Now
              </Button>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MechanicsSearchPage;
