// import React from "react";
// import Footer from "../Components/Footer";
// import {
//   Box,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardMedia,
//   Button,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const serviceList = [
//   {
//     title: "Instant Vehicle Repair Service",
//     description:
//       "Expert mechanics come to your location for quick and reliable repairs, saving you the hassle of traveling to a garage. Whether it's a minor adjustment or a major fix, our team ensures high-quality service right where you need it.",
//     imageUrl:
//       "https://th.bing.com/th/id/OIP.IVH2CoEYbfgcg7LWuNuygAHaE6?rs=1&pid=ImgDetMain",
//     price: "₹2500",
//   },
//   {
//     title: "Brake System Service",
//     description:
//       "Inspection and repair of brake pads, discs, and fluid levels for safety.",
//     imageUrl:
//       "https://www.fivezsautorepair.com/wp-content/uploads/2019/10/car-brakes-replacing-repairing.jpg",
//     price: "₹1250",
//   },
//   {
//     title: "Engine Service",
//     description:
//       "Complete engine diagnostics and repairs for optimal performance.",
//     imageUrl:
//       "https://pmmonline.co.uk/wp-content/uploads/2019/03/mahle-aftermarket-main.jpg",
//     price: "₹8000",
//   },
//   {
//     title: "Oil Change",
//     description:
//       "High-quality engine oil change to keep your engine running smoothly.",
//     imageUrl:
//       "https://th.bing.com/th/id/R.5e864660a591d898c30bd2bb623e6533?rik=SVvCKElR9zKQiA",
//     price: "₹3200",
//   },
//   {
//     title: "Tyre Change and Repair",
//     description:
//       "Ensure safety and performance with expert tyre services and repairs.",
//     imageUrl:
//       "https://nmtoakville.com/wp-content/uploads/2017/05/hero__tire-service.jpg",
//     price: "₹3200",
//   },
//   {
//     title: "Battery Jumpstart",
//     description:
//       "Quick battery jumpstart service to get your vehicle back on the road.",
//     imageUrl:
//       "https://th.bing.com/th/id/OIP.DaXHTBqmlXglEQtH8M8xdwHaEK?rs=1&pid=ImgDetMain",
//     price: "₹500",
//   },
// ];

// const Service = () => {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box sx={{ backgroundColor: "#f4f6f8", py: 6, px: 2 }}>
//       <Container>
//         <Typography
//           variant={isMobile ? "h5" : "h4"}
//           textAlign="center"
//           gutterBottom
//           sx={{ fontWeight: "bold", mb: 4, color: "#222" }}
//         >
//           Our Services
//         </Typography>

//         <Grid container spacing={3} justifyContent="center">
//           {serviceList.map((service, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card
//                 sx={{
//                   width: "100%",
//                   maxWidth: 360,
//                   boxShadow: 5,
//                   borderRadius: 3,
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
//                   backgroundColor: "white",
//                 }}
//               >
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={service.imageUrl}
//                   alt={service.title}
//                   sx={{ objectFit: "cover" }}
//                 />
//                 <CardContent sx={{ p: 2 }}>
//                   <Typography
//                     variant="h6"
//                     gutterBottom
//                     sx={{ fontWeight: "bold", color: "#222" }}
//                   >
//                     {service.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#555", mb: 2 }}
//                   >
//                     {service.description}
//                   </Typography>
//                   <Typography
//                     variant="h6"
//                     color="primary"
//                     sx={{ fontWeight: "bold" }}
//                   >
//                     {service.price}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     fullWidth
//                     sx={{ mt: 2, fontWeight: "bold" }}
//                     onClick={() => navigate("/register/problem")}
//                   >
//                     Book Now
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* <Box textAlign="center" mt={5}>
//           <Button
//             variant="contained"
//             sx={{
//               px: 4,
//               py: 1.5,
//               backgroundColor: "#d32f2f",
//               color: "white",
//               fontSize: "1rem",
//               fontWeight: "bold",
//               "&:hover": { backgroundColor: "#b71c1c" },
//             }}
//             onClick={() => navigate("/services")}
//           >
//             See More Services
//           </Button>
//         </Box> */}
//       </Container>
//       <Footer />
//     </Box>
//   );
// };

// export default Service;




import React from "react";
import Footer from "../Components/Footer";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const serviceList = [
  {
    title: "Instant Vehicle Repair Service",
    description:
      "Expert mechanics come to your location for quick and reliable repairs, saving you the hassle of traveling to a garage. Whether it's a minor adjustment or a major fix, our team ensures high-quality service right where you need it.",
    imageUrl:
      "https://th.bing.com/th/id/OIP.IVH2CoEYbfgcg7LWuNuygAHaE6?rs=1&pid=ImgDetMain",
    price: "₹3000",
  },
  {
    title: "Brake System Service",
    description:
      "Inspection and repair of brake pads, discs, and fluid levels for safety.",
    imageUrl:
      "https://www.fivezsautorepair.com/wp-content/uploads/2019/10/car-brakes-replacing-repairing.jpg",
    price: "₹1250",
  },
  {
    title: "Engine Service",
    description:
      "Complete engine diagnostics and repairs for optimal performance.",
    imageUrl:
      "https://pmmonline.co.uk/wp-content/uploads/2019/03/mahle-aftermarket-main.jpg",
    price: "₹8000",
  },
  {
    title: "Oil Change",
    description:
      "High-quality engine oil change to keep your engine running smoothly.",
    imageUrl:
      "https://th.bing.com/th/id/R.5e864660a591d898c30bd2bb623e6533?rik=SVvCKElR9zKQiA",
    price: "₹3200",
  },
  {
    title: "Tyre Change and Repair",
    description:
      "Ensure safety and performance with expert tyre services and repairs.",
    imageUrl:
      "https://nmtoakville.com/wp-content/uploads/2017/05/hero__tire-service.jpg",
    price: "₹3200",
  },
  {
    title: "Battery Jumpstart",
    description:
      "Quick battery jumpstart service to get your vehicle back on the road.",
    imageUrl:
      "https://th.bing.com/th/id/OIP.DaXHTBqmlXglEQtH8M8xdwHaEK?rs=1&pid=ImgDetMain",
    price: "₹500",
  },
];

const Service = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", py: 6, px: 2 }}>
      <Container>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4, color: "#222" }}
        >
          Our Services
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {serviceList.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  boxShadow: 5,
                  borderRadius: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
                  backgroundColor: "white",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.imageUrl}
                  alt={service.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ padding: 3 }}>
                  {/* Flexbox Layout for Card Content */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Title Section */}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#222",
                          paddingBottom: "6px",
                        }}
                      >
                        {service.title}
                      </Typography>
                    </Box>

                    {/* Description Section */}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#555",
                          paddingBottom: "12px",
                        }}
                      >
                        {service.description}
                      </Typography>
                    </Box>

                    {/* Price Section */}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{
                          fontWeight: "bold",
                          paddingBottom: "12px",
                        }}
                      >
                        {service.price}
                      </Typography>
                    </Box>

                    {/* Button Section */}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          fontWeight: "bold",
                          padding: "12px",
                          marginTop: "12px",
                        }}
                        onClick={() => navigate("/register/problem")}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Service;

