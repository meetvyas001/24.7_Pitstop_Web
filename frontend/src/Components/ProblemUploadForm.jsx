import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Modal,
  LinearProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import Footer from "./Footer";

const ProblemUploadForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId, price } = location.state || "";

  const priceData = {
    price: price,
  };

  const access = localStorage.getItem("accessToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm();
  const [image, setImage] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mechanicStatus, setMechanicStatus] = useState("loading");
  const [MechanicsDetails, setMechanicDetails] = useState({});
  const [locationFetched, setLocationFetched] = useState(false); // Track location fetch status

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    clearErrors("image");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  const getCoordinates = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
          setLocationLoading(false);
          setLocationFetched(true); // Set locationFetched to true when coordinates are fetched
          setValue("latitude", latitude);
          setValue("longitude", longitude);
        },
        (error) => {
          setLocationLoading(false);
          setLocationFetched(false); // Keep locationFetched false if there's an error
          console.error("Error getting location:", error);
          Swal.fire({
            title: "Error!",
            text: "Unable to retrieve your location. Please enable location services.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      );
    } else {
      setLocationLoading(false);
      setLocationFetched(false); // Keep locationFetched false if geolocation is not supported
      Swal.fire({
        title: "Error!",
        text: "Geolocation is not supported by this browser.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // const onSubmit = async (data) => {
  //   if (!image) {
  //     setError("image", {
  //       type: "manual",
  //       message: "Please upload an image.",
  //     });
  //     return;
  //   }

  //   if (!coordinates) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Please get your location first.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("serviceId", serviceId);
  //   formData.append("vechileType", data.vehicleType);
  //   formData.append("description", data.problemDescription);
  //   formData.append("file", image);
  //   formData.append("lat", data.latitude);
  //   formData.append("lng", data.longitude);

    
  //   setModalOpen(true);
  //   setLoading(true);
  //   setMechanicStatus("loading");
    
  //   console.log("formData",data)
  //   console.log("formData",formData);
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/service-request/create`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${access}`,
  //         },
  //       }
  //     );

  //     const mechanicDetails = response?.data?.data?.mechanicDetails;
  //     setMechanicDetails(mechanicDetails);

  //     const mechanicsDetails = {
  //       MechanicsDetails: mechanicDetails,
  //       price: priceData,
  //     };

  //     if (response.status === 200) {
  //       const service_request_id = response?.data?.data?._id;
  //       let attempts = 0;
  //       const intervalId = setInterval(async () => {
  //         const fetchResponse = await fetchNearestMechanic(service_request_id);

  //         if (fetchResponse) {
  //           clearInterval(intervalId);
  //           setMechanicStatus("success");

  //           Swal.fire({
  //             title: "Success!",
  //             text: "Mechanic Found !!",
  //             icon: "success",
  //             confirmButtonText: "Proceed",
  //           }).then(() => {
  //             navigate("/search/mechanics", {
  //               state: {
  //                 price: priceData,
  //                 mechanicsDetails: mechanicsDetails,
  //               },
  //             });
  //           });
  //         }

  //         attempts += 1;

  //         if (attempts >= 20) {
  //           clearInterval(intervalId);
  //           setMechanicStatus("error");
  //         }
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: error?.response?.data?.message,
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
// -----------------------------------------------------------------------------
  // const onSubmit = async (data) => {
  //   if (!image) {
  //     setError("image", {
  //       type: "manual",
  //       message: "Please upload an image.",
  //     });
  //     return;
  //   }
  
  //   if (!coordinates) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: "Please get your location first.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append("serviceId", serviceId);
  //   formData.append("vechileType", data.vehicleType);
  //   formData.append("description", data.problemDescription);
  //   formData.append("file", image);
  //   formData.append("lat", data.latitude);
  //   formData.append("lng", data.longitude);
  
  //   // **Properly logging FormData contents**
  //   console.log("FormData contents:");
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}:`, value);
  //   }
  
  //   setModalOpen(true);
  //   setLoading(true);
  //   setMechanicStatus("loading");
  
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/service-request/create`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${access}`,
  //         },
  //       }
  //     );
  
  //     const mechanicDetails = response?.data?.data?.mechanicDetails;
  //     setMechanicDetails(mechanicDetails);
  
  //     const mechanicsDetails = {
  //       MechanicsDetails: mechanicDetails,
  //       price: priceData,
  //     };
  
  //     if (response.status === 200) {
  //       const service_request_id = response?.data?.data?._id;
  //       let attempts = 0;
  //       const intervalId = setInterval(async () => {
  //         const fetchResponse = await fetchNearestMechanic(service_request_id);
  
  //         if (fetchResponse) {
  //           clearInterval(intervalId);
  //           setMechanicStatus("success");
  
  //           Swal.fire({
  //             title: "Success!",
  //             text: "Mechanic Found !!",
  //             icon: "success",
  //             confirmButtonText: "Proceed",
  //           }).then(() => {
  //             navigate("/search/mechanics", {
  //               state: {
  //                 price: priceData,
  //                 mechanicsDetails: mechanicsDetails,
  //               },
  //             });
  //           });
  //         }
  
  //         attempts += 1;
  
  //         if (attempts >= 20) {
  //           clearInterval(intervalId);
  //           setMechanicStatus("error");
  //         }
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     Swal.fire({
  //       title: "Error!",
  //       text: error?.response?.data?.message,
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const onSubmit = async (data) => {
    if (!image) {
      setError("image", {
        type: "manual",
        message: "Please upload an image.",
      });
      return;
    }
  
    if (!coordinates) {
      Swal.fire({
        title: "Error!",
        text: "Please get your location first.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  
    const formData = new FormData();
    formData.append("serviceId", serviceId);
    formData.append("vehicleType", data.vehicleType);
    formData.append("description", data.problemDescription);
    formData.append("file", image);
    formData.append("lat", data.latitude);
    formData.append("lng", data.longitude);
  
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    setModalOpen(true);
    setLoading(true);
    setMechanicStatus("loading");
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/service-request/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access}`,
          },
        }
      );
  
      const mechanicDetails = response?.data?.data?.mechanicDetails;
      setMechanicDetails(mechanicDetails);
  
      const mechanicsDetails = {
        MechanicsDetails: mechanicDetails,
        price: priceData,
      };
  
      if (response.status === 200) {
        const service_request_id = response?.data?.data?._id;
        let attempts = 0;
        const intervalId = setInterval(async () => {
          const fetchResponse = await fetchNearestMechanic(service_request_id);
  
          if (fetchResponse) {
            clearInterval(intervalId);
            setMechanicStatus("success");
            setLoading(false); // Stop the loading/progress bar
            setModalOpen(false); // Close the modal immediately
  
            // Show the success alert
            Swal.fire({
              title: "Success!",
              text: "Mechanic Found !!",
              icon: "success",
              confirmButtonText: "Proceed",
            }).then(() => {
              // Navigate to the next page after user confirms the alert
              navigate("/search/mechanics", {
                state: {
                  price: priceData,
                  mechanicsDetails: mechanicsDetails,
                },
              });
            });
          }
  
          attempts += 1;
  
          if (attempts >= 20) {
            clearInterval(intervalId);
            setMechanicStatus("error");
            setLoading(false); // Stop the progress bar in case of failure
          }
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error!",
        text: error?.response?.data?.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Ensure progress bar stops in all cases
    }
  };

  const fetchNearestMechanic = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/service-request/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (response?.data?.data?.status === "ACCEPTED") {
        return true;
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  };

  const clearImage = () => {
    setImage(null);
    clearErrors("image");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f4f8",
          padding: 3,
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: 2, md: 0 },
            maxWidth: { xs: "100%", md: 500 },
            order: { xs: 1, md: 0 },
          }}
        >
          <Box sx={{ width: "100%", textAlign: "center", marginBottom: 2 }}>
            <img
              src="https://cbx-prod.b-cdn.net/COLOURBOX56574537.jpg?width=800&height=800&quality=70"
              alt="Repair Service"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            maxWidth: 600,
            padding: { xs: 2, md: 4 },
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            order: { xs: 0, md: 1 },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "600", marginBottom: 2, textAlign: "center" }}
          >
            Report a Problem
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.vehicleType}>
                  <InputLabel>Vehicle Type</InputLabel>
                  <Select
                    label="Vehicle Type"
                    {...register("vehicleType", {
                      required: "Vehicle type is required",
                    })}
                  >
                    <MenuItem value="activa">Activa</MenuItem>
                    <MenuItem value="bike">Bike</MenuItem>
                    <MenuItem value="car">Car</MenuItem>
                    <MenuItem value="Auto">Auto</MenuItem>
                    <MenuItem value="heavy-duty">Heavy Duty</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <FormHelperText>{errors.vehicleType?.message}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    border: "2px dashed #3f51b5",
                    padding: 3,
                    textAlign: "center",
                    borderRadius: 2,
                    backgroundColor: "#f0f4f8",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <Typography variant="body1" color="textSecondary">
                    Drag & Drop an image here or click to select an image
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 1 }}
                  >
                    Supported formats: JPG, PNG, JPEG
                  </Typography>
                </Box>
                {image && (
                  <Box sx={{ marginTop: 2, position: "relative" }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <Button
                      variant="contained"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "red",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "#ff4d4d",
                        },
                      }}
                      onClick={clearImage}
                    >
                      Clear Image
                    </Button>
                  </Box>
                )}
                {errors.image && (
                  <FormHelperText error>{errors.image?.message}</FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Describe Problem"
                  variant="outlined"
                  multiline
                  rows={4}
                  {...register("problemDescription", {
                    required: "Problem description is required",
                  })}
                  error={!!errors.problemDescription}
                  helperText={errors.problemDescription?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    width: "60%",
                    backgroundColor: locationFetched ? "green" : "black",
                    color: "white",
                    marginBottom: 2,
                    "&:hover": {
                      backgroundColor: locationFetched ? "#388e3c" : "green",
                    },
                  }}
                  onClick={getCoordinates}
                  disabled={locationLoading}
                >
                  {locationLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Provide Your Location"
                  )}
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": { backgroundColor: "red" },
                  }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Footer />
      <Modal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
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
      width: 400,
    }}
  >
    {mechanicStatus === "loading" && (
      <LinearProgress sx={{ marginBottom: 2 }} />
    )}
    {mechanicStatus === "error" && (
      <Typography variant="h6" color="error">
        Failed to find a mechanic. Please try again.
      </Typography>
    )}
  </Box>
</Modal>

    </>
  );
};

export default ProblemUploadForm;
