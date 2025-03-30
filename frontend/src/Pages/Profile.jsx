// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Container,
//   Box,
//   Avatar,
//   Typography,
//   Paper,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import axios from "axios";

// const Profile = () => {
//   const [userData, setUserData] = useState([]);
//   const [userHistory, setUserHistory] = useState([]); // Initialize as an empty array

//   const uuid = localStorage.getItem("userId");
//   console.log(uuid);

//   useEffect(() => {
//     fetchProfileData();
//     fetchServiceHistory();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/user/${uuid}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       setUserData(response?.data?.data);
//       console.log("userResponse", response?.data?.data);
//     } catch (err) {
//       console.log("Error: ", err);
//     }
//   };

//   const fetchServiceHistory = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/user/service-history/${uuid}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       // Ensure the data is an array
//       if (Array.isArray(response?.data?.data)) {
//         setUserHistory(response?.data?.data);
//       } else {
//         setUserHistory([]); // Fallback to an empty array if the response is not an array
//       }
//       console.log("servicehistory", response?.data?.data);
//     } catch (err) {
//       console.log("Error fetching service history: ", err);
//       setUserHistory([]); // Fallback to empty array in case of error
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       <Navbar />

//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         <Container sx={{ mt: 4, mb: 4, padding: 5 }}>
//           {/* User Profile Container */}
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             <Grid
//               item
//               xs={12}
//               md={4}
//               sx={{ display: "flex", justifyContent: "center" }}
//             >
//               <Avatar
//                 alt="User"
//                 // src="/static/images/avatar/1.jpg"
//                 sx={{ width: 150, height: 150 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={8}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 <Typography variant="h5" sx={{ mb: 1 }}>
//                   {userData.firstName} {userData.lastName}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                   Email: {userData.email}
//                 </Typography>
//                 <Typography variant="body1">
//                   Contact: {userData.address}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>

//         <Container sx={{ mb: 4 }}>
//           {/* Service History Data Grid Container */}
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <TableContainer>
//               <Table size="small" aria-label="service history table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Service ID</TableCell>
//                     <TableCell>Mechanic Name</TableCell>
//                     <TableCell>Description</TableCell>
//                     <TableCell>Total Amount</TableCell>
//                     <TableCell>Service Date</TableCell>
//                     <TableCell>Mechanic Contact</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {userHistory?.length > 0 ? (
//                     userHistory.map((service) => (
//                       <TableRow key={service._id}>
//                         <TableCell>{service._id}</TableCell>
//                         <TableCell>{service.mechanicName}</TableCell>
//                         <TableCell>{service.description}</TableCell>
//                         <TableCell>₹{service.totalAmount}</TableCell>
//                         <TableCell>
//                           {new Date(service.createdAt).toLocaleDateString()}
//                         </TableCell>
//                         <TableCell>{service.mechanicContact}</TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">
//                         No service history available.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Container>
//       </Box>

//       <Footer />
//     </Box>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { AccountCircle, Email, Home } from "@mui/icons-material";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

const predefinedAvatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
 
];

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [userHistory, setUserHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [filter, setFilter] = useState("newest");

  const uuid = localStorage.getItem("userId");

  useEffect(() => {
    fetchProfileData();
    fetchServiceHistory();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filter, userHistory]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/${uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUserData(response?.data?.data || {});
      setProfilePic(response?.data?.data?.profilePic || "https://i.pravatar.cc/150?img=0");
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  const fetchServiceHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/service-history/${uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const history = Array.isArray(response?.data?.data) ? response.data.data : [];
      setUserHistory(history);
      setFilteredHistory(history);
    } catch (err) {
      console.error("Error fetching service history:", err);
    }
  };

  const applyFilter = () => {
    let sortedHistory = [...userHistory];
    if (filter === "newest") {
      sortedHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter === "oldest") {
      sortedHistory.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setFilteredHistory(sortedHistory);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#f4f6f8" }}>
      <Navbar />

      <Container sx={{ flex: 1, py: 4 }}>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 4, backgroundColor: "#fff" }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                  src={profilePic}
                  alt="User Avatar"
                  sx={{
                    width: 140,
                    height: 140,
                    border: "4px solid #1976d2",
                    boxShadow: 4,
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2, flexWrap: "wrap" }}>
                  {predefinedAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      sx={{
                        width: 50,
                        height: 50,
                        cursor: "pointer",
                        transition: "0.3s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                      onClick={() => setProfilePic(avatar)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={9}>
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#333", mb: 2, display: "flex", alignItems: "center" }}>
                  <AccountCircle sx={{ mr: 1, color: "#1976d2" }} />
                  {userData.firstName} {userData.lastName}
                </Typography>

                <Typography variant="body1" sx={{ color: "#555", mb: 1, display: "flex", alignItems: "center" }}>
                  <Email sx={{ mr: 1, color: "#1976d2" }} />
                  <strong>Email:</strong> {userData.email}
                </Typography>

                <Typography variant="body1" sx={{ color: "#555", mb: 1, display: "flex", alignItems: "center" }}>
                  <Home sx={{ mr: 1, color: "#1976d2" }} />
                  <strong>Address:</strong> {userData.address || "Not provided"}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>

        <Typography variant="h6" sx={{ mt: 5, fontWeight: "bold", color: "#333" }}>
          Service History
        </Typography>

        <FormControl sx={{ mt: 2, width: "200px" }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </FormControl>

        <Card elevation={3} sx={{ mt: 2, borderRadius: 2, overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table size="medium">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1976d2" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Service ID</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Mechanic</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((service) => (
                    <TableRow key={service._id} hover>
                      <TableCell>{service._id}</TableCell>
                      <TableCell>{service.mechanicName}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>₹{service.totalAmount}</TableCell>
                      <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{service.mechanicContact}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      No service history available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
      <Footer />
    </Box>
  );
};

export default Profile;
