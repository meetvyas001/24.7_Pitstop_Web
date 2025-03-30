import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Divider,
  ThemeProvider,
  createTheme,
  ListItemIcon,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PersonIcon from "@mui/icons-material/Person";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const AdminDashboard = () => {
  const [selectedTitle, setSelectedTitle] = useState("Services");
  const [openSidebar, setOpenSidebar] = useState(true);
  const [data, setData] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
    file: null,
  });
  const [updatedService, setUpdatedService] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [fileName, setFileName] = useState("");

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const adminAccessToken = localStorage.getItem("adminAccessToken");

  useEffect(() => {
    if (!adminAccessToken) {
      navigate("/admin/login");
    } else {
      fetchData("service/all");
    }
  }, [adminAccessToken]);

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${endpoint}`,
        {
          headers: { Authorization: `Bearer ${adminAccessToken}` },
        }
      );
      const fetchedData = response?.data?.data || [];
      setData(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const sidebarItems = [
    {
      text: "Services",
      icon: <ElectricalServicesIcon />,
      onClick: () => {
        setSelectedTitle("Services");
        fetchData("service/all");
        if (isMobile) toggleSidebar();
      },
    },
    {
      text: "Service Requests",
      icon: <ElectricalServicesIcon />,
      onClick: () => {
        setSelectedTitle("Service Requests");
        fetchData("service-request/all");
        if (isMobile) toggleSidebar();
      },
    },
    {
      text: "Users",
      icon: <PersonIcon />,
      onClick: () => {
        setSelectedTitle("Users");
        fetchData("user/all");
        if (isMobile) toggleSidebar();
      },
    },
    {
      text: "Mechanics",
      icon: <PrecisionManufacturingIcon />,
      onClick: () => {
        setSelectedTitle("Mechanics");
        fetchData("auth-user/all");
        if (isMobile) toggleSidebar();
      },
    },
    {
      text: "Logout",
      icon: <ExitToAppIcon />,
      onClick: () => {
        localStorage.removeItem("adminAccessToken");
        navigate("/admin/login");
      },
    },
  ];

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const columnsMap = {
    Services: [
      { field: "_id", headerName: "ID", flex: 1 },
      { field: "title", headerName: "Title", flex: 1 },
      { field: "description", headerName: "Description", flex: 2 },
      { field: "price", headerName: "Price", flex: 1 },
      {
        field: "imageUrl",
        headerName: "Image",
        flex: 1,
        renderCell: (params) => (
          <img src={params.value} alt="Service" width={50} height={50} />
        ),
      },
      { field: "createdAt", headerName: "Created At", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: (params) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEditClick(params.row)}
              sx={{ marginRight: 2 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteClick(params.row._id)}
            >
              Delete
            </Button>
          </Box>
        ),
        flex: 2,
      },
    ],
    "Service Requests": [
      { field: "_id", headerName: "ID", flex: 1 },
      { field: "userFirstName", headerName: "User FirstName", flex: 1 },
      { field: "userLastName", headerName: "User LastName", flex: 1 },
      { field: "userContactNumber", headerName: "User ContactNumber", flex: 1 },
      { field: "service_id", headerName: "ServiceId", flex: 1 },
      { field: "serviceTitle", headerName: "Service Taken", flex: 1 },
      { field: "servicePrice", headerName: "Service Price", flex: 1 },
      { field: "mechanic_id", headerName: "MechanicId", flex: 1 },
      { field: "mechanicFirstName", headerName: "Mechanic FirstName", flex: 1 },
      { field: "mechanicLastName", headerName: "Mechanic LastName", flex: 1 },
      { field: "status", headerName: "Status", flex: 1 },
      { field: "createdAt", headerName: "Created At", flex: 1 },
    ],
    Users: [
      { field: "_id", headerName: "ID", flex: 1 },
      { field: "firstName", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },

      { field: "createdAt", headerName: "Created At", flex: 1 },
    ],
    Mechanics: [
      { field: "_id", headerName: "ID", flex: 1 },
      { field: "firstName", headerName: "Name", flex: 1 },
      { field: "email", headerName: "Email", flex: 1 },
      { field: "contactNumber", headerName: "ContactNumber", flex: 1 },
      { field: "createdAt", headerName: "Created At", flex: 1 },
    ],
  };

  const handleCreateClick = () => {
    setOpenCreateModal(true); // Open the create modal on button click
  };

  const handleEditClick = (service) => {
    setSelectedService(service); // Set the selected service for editing
    setUpdatedService({
      title: service.title,
      description: service.description,
      price: service.price,
    });
    setOpenEditModal(true); // Open the edit modal on button click
  };

  const handleCreateService = async () => {
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", newService.title);
      formData.append("description", newService.description);
      formData.append("price", newService.price);
      formData.append("file", newService.file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/service/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );

      if (response.status === 200) {
        fetchData("service/all");
        setOpenCreateModal(false);
        setIsCreating(false);
        Swal.fire({
          title: "Created!",
          text: response.data.message || "Service created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error creating service:", error);
      setIsCreating(false);

      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to create service.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleFileChange = (e) => {
    setIsUploadingFile(true);
    const file = e.target.files[0];
    setFileName(file?.name || "");
    setNewService({ ...newService, file });
    setIsUploadingFile(false);
  };

  const handleUpdateClick = async () => {
    setIsUpdating(true);

    const updatedFields = {};

    if (updatedService.title !== selectedService.title) {
      updatedFields.title = updatedService.title;
    }
    if (updatedService.description !== selectedService.description) {
      updatedFields.description = updatedService.description;
    }
    if (updatedService.price !== selectedService.price) {
      updatedFields.price = updatedService.price;
    }

    if (Object.keys(updatedFields).length === 0) {
      Swal.fire({
        title: "No Changes!",
        text: "No fields have been updated.",
        icon: "info",
        confirmButtonText: "OK",
      });
      setIsUpdating(false);
      return;
    }

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/service/${selectedService._id}`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${adminAccessToken}`,
          },
        }
      );

      if (response.status === 200) {
        fetchData("service/all");
        setOpenEditModal(false);
        setIsUpdating(false);
        Swal.fire({
          title: "Updated!",
          text: response.data.message || "Service updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating service:", error);
      setIsUpdating(false);

      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message || "Failed to update service.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDeleteClick = (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/service/${serviceId}`, {
            headers: { Authorization: `Bearer ${adminAccessToken}` },
          })
          .then((response) => {
            Swal.fire("Deleted!", response.data.message, "success");
            fetchData("service/all");
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              error?.response?.data?.message || "Failed to delete service.",
              "error"
            );
          });
      }
    });
  };

  const sectionBackgroundColor = {
    Services: "#F4F6F8",
    "Service Requests": "#F4F6F8",
    Users: "#F4F6F8",
    Mechanics: "#F4F6F8",
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}
      >
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              backgroundColor: "#ffffff",
              color: "#333",
              paddingTop: 3,
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #ddd",
            },
          }}
          variant={isMobile ? "temporary" : "permanent"}
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          ModalProps={{ keepMounted: true }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}
          >
            <img src="/assets/logo.png" alt="Logo" width={150} />
          </Box>
          <Divider />
          <List>
            {sidebarItems.map((item, index) => (
              <ListItem button key={index} onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            backgroundColor: sectionBackgroundColor[selectedTitle],
          }}
        >
          <Container sx={{ padding: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              {selectedTitle}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {selectedTitle === "Services" && (
                <Button
                  variant="contained"
                  color="black"
                  startIcon={<AddIcon />}
                  onClick={handleCreateClick} // Open the create modal
                  sx={{ marginBottom: 2 }}
                >
                  Create Service
                </Button>
              )}
            </Box>

            <Box sx={{ height: 400, width: "100%", backgroundColor: "#fff" }}>
              {data.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <DataGrid
                  rows={data}
                  columns={columnsMap[selectedTitle] || []}
                  pageSize={5}
                  autoHeight
                  getRowId={(row) => row._id}
                />
              )}
            </Box>
          </Container>

          {/* Create Service Modal */}
          <Dialog
            open={openCreateModal} // Modal visibility controlled by this state
            onClose={() => setOpenCreateModal(false)} // Close the modal
          >
            <DialogTitle>Create Service</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
                }
                margin="normal"
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
                margin="normal"
              />
              <Box sx={{ marginTop: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {isUploadingFile && <CircularProgress size={24} />}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCreateModal(false)}>Cancel</Button>
              <Button onClick={handleCreateService} disabled={isCreating}>
                {isCreating ? "Creating..." : "Create"}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Service Modal */}
          <Dialog
            open={openEditModal} // Modal visibility controlled by this state
            onClose={() => setOpenEditModal(false)} // Close the modal
          >
            <DialogTitle>Edit Service</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={updatedService.title}
                onChange={(e) =>
                  setUpdatedService({
                    ...updatedService,
                    title: e.target.value,
                  })
                }
                margin="normal"
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                value={updatedService.description}
                onChange={(e) =>
                  setUpdatedService({
                    ...updatedService,
                    description: e.target.value,
                  })
                }
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={updatedService.price}
                onChange={(e) =>
                  setUpdatedService({
                    ...updatedService,
                    price: e.target.value,
                  })
                }
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
              <Button onClick={handleUpdateClick} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
