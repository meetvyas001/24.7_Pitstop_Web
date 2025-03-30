import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "@mui/material";

// Create the theme with Roboto font
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const MechanicDashboard = () => {
  const location = useLocation();
  const { mechanicId } = location.state || "";
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("MechanicaccessToken");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("Service Requests");
  const [openSidebar, setOpenSidebar] = useState(true);
  const [services, setServices] = useState([]);
  const [timers, setTimers] = useState({}); // Track timers for each service
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!accessToken) {
      navigate("/mechanic/login");
    }
    fetchMechanicServices();
  }, []);

  // Fetch services from API
  const fetchMechanicServices = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/service-request/mechanic-requests/${mechanicId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const fetchedServices = response.data.data;

      // Format fetched services and initialize timers
      const formattedServices = fetchedServices.map((service) => ({
        id: service._id,
        serviceId: service.serviceId,
        description: service.description,
        vechileType: service.vechileType.join(", "),
        status: service.status,
        userFirstName: service.userDetails.firstName,
        userLastName: service.userDetails.lastName,
        userEmail: service.userDetails.email,
        lat: service.lat,
        lng: service.lng,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        isButtonDisabled: service.status === "ACCEPTED" || service.status === "DECLINED",
        buttonText: service.status === "DECLINED" ? "DECLINED" : "Accept",
      }));

      setServices(formattedServices);

      // Start a timer for each service to handle "DECLINED" state
      formattedServices.forEach((service) => {
        if (service.status === "PENDING") {
          const timerId = setTimeout(() => {
            handleDecline(service.id, service.serviceId);
          }, 10000); // 10 seconds timer
          setTimers((prevTimers) => ({ ...prevTimers, [service.serviceId]: timerId }));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Decline service after 10 seconds if not accepted
  const handleDecline = async (id, serviceId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/service-request/update-status/${id}`,
        { status: "DECLINED" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.serviceId === serviceId
              ? { ...service, status: "DECLINED", isButtonDisabled: true, buttonText: "DECLINED" }
              : service
          )
        );
      }
    } catch (err) {
      console.log("Error updating service status:", err);
    }
  };

  // Handle Accept action and clear the timer
  // const handleAccept = async (id, serviceId) => {
  //   clearTimeout(timers[serviceId]); // Clear the timer when accepting

  //   try {
  //     const response = await axios.patch(
  //       `${import.meta.env.VITE_API_URL}/service-request/update-status/${id}`,
  //       { status: "ACCEPTED" },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setServices((prevServices) =>
  //         prevServices.map((service) =>
  //           service.serviceId === serviceId
  //             ? { ...service, status: "ACCEPTED", isButtonDisabled: true, buttonText: "ACCEPTED" }
  //             : service
  //         )
  //       );
  //     }
  //   } catch (err) {
  //     console.log("Error accepting service request:", err);
  //   }
  // };

  const handleAccept = async (id, serviceId) => {
    clearTimeout(timers[serviceId]); // Clear the timer when accepting
  
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/service-request/update-status/${id}`,
        { status: "ACCEPTED" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.status === 200) {
        setServices((prevServices) =>
          prevServices.map((service) =>
            service.id === id // Ensure only the clicked row gets updated
              ? { ...service, status: "ACCEPTED", isButtonDisabled: true, buttonText: "ACCEPTED" }
              : service
          )
        );
      }
    } catch (err) {
      console.log("Error accepting service request:", err);
    }
  };
  

  // Handle Avatar Menu
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Sidebar toggle
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // Sidebar items with icons
  const sidebarItems = [
    {
      text: "Service Requests",
      icon: <AccountCircleIcon />,
      onClick: () => {
        setSelectedTitle("Service Requests");
        if (isMobile) toggleSidebar();
      },
    },
  ];

  // DataGrid columns for Service Requests with Actions column
  const serviceColumns = [
    { field: "id", headerName: "ID", width: 180 },
    // { field: "serviceId", headerName: "Service ID", width: 180 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "vechileType", headerName: "Vehicle Type", width: 180 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "userFirstName", headerName: "User First Name", width: 180 },
    { field: "userLastName", headerName: "User Last Name", width: 180 },
    { field: "userEmail", headerName: "User Email", width: 250 },
    { field: "lat", headerName: "Latitude", width: 150 },
    { field: "lng", headerName: "Longitude", width: 150 },
    { field: "createdAt", headerName: "Created At", width: 180 },
    { field: "updatedAt", headerName: "Updated At", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const isAccepted = params.row.status === "ACCEPTED";
        const isDeclined = params.row.status === "DECLINED";
        const isPending = params.row.status === "PENDING";

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAccept(params.row.id, params.row.serviceId)}
            sx={{
              backgroundColor: isDeclined ? "gray" : isAccepted ? "gray" : "black",
              color: "white",
              "&:hover": { backgroundColor: isDeclined ? "gray" : isAccepted ? "gray" : "darkgray" },
            }}
            disabled={isAccepted || isDeclined}
          >
            {isPending ? "ACCEPT" : params.row.buttonText}
          </Button>
        );
      },
    },
  ];

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("MechanicaccessToken");
    navigate("/mechanic/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", height: "100vh", backgroundColor: "e9e9e9" }}>
        {/* Sidebar */}
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              backgroundColor: "#e9e9e9",
              color: "#333",
              boxSizing: "border-box",
              paddingTop: 3,
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #ddd",
              transition: "all 0.3s ease",
            },
          }}
          variant={isMobile ? "temporary" : "permanent"}
          open={openSidebar}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
            <img src="/assets/logo.png" alt="" width={150} />
          </Box>
          <Divider sx={{ backgroundColor: "#ddd" }} />
          <List sx={{ paddingTop: 2 }}>
            {sidebarItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  setSelectedTitle(item.text);
                  if (isMobile) toggleSidebar();
                }}
                sx={{
                  backgroundColor: selectedTitle === item.text ? "yellow" : "transparent",
                  "&:hover": { backgroundColor: "white" },
                  cursor: "pointer",
                }}
              >
                <ListItemIcon sx={{ color: "#333" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "#333" }} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
          <AppBar
            position="fixed"
            sx={{
              top: 0,
              left: 0,
              right: 0,
              marginBottom: 2,
              backgroundColor: "transparent",
              color: "#333",
              boxShadow: "none",
              zIndex: theme.zIndex.drawer + 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Toolbar>
              {!openSidebar && isMobile && (
                <Tooltip title="Open Sidebar">
                  <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar} sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={handleAvatarClick}>
                <Avatar />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: 4, width: "100%", backgroundColor: "#ffffff", borderRadius: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginTop: "80px", overflowY: "auto", height: "calc(100vh - 80px)" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2, color: "#333" }}>{selectedTitle}</Typography>

            <div style={{ height: 400, width: "100%" }}>
              {selectedTitle === "Service Requests" && (
                <DataGrid
                  rows={services}
                  columns={serviceColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  pagination
                />
              )}
            </div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MechanicDashboard;
