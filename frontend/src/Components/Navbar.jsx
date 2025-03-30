import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  Box,
  Container,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  createTheme,
  ThemeProvider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  useScrollTrigger,
  ListItemIcon,
} from "@mui/material";
import { Menu as MenuIcon, Home, Build, Info, Help, ExitToApp, AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const theme = createTheme({
  palette: {
    primary: { main: "#ffffff" },
    secondary: { main: "#ff3c38" },
    text: { primary: "#1a1a1a", secondary: "#ffffff" },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
});

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Navbar = () => {
  const access = localStorage.getItem("accessToken");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNavigate = (path) => {
    handleClose();
    setDrawerOpen(false);
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          transition: "all 0.3s ease",
          background: isScrolled ? "rgba(250, 250, 250, 0.05)" : "rgba(250, 250, 250, 0.25)",
          boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => handleNavigate("/")}
              sx={{ transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}
            >
              <img src="/Pitstop.png" alt="Logo" width={160} />
            </Button>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile ? (
                <>
                  <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
                    <MenuIcon />
                  </IconButton>

                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{ sx: { backgroundColor: "#fff" } }}
                  >
                    <Box sx={{ width: 240, p: 2 }}>
                      <Typography variant="h6" fontWeight={600} mb={2}>
                        Menu
                      </Typography>
                      <List>
                        {[
                          { label: "Home", path: "/", icon: <Home /> },
                          { label: "Services", path: "/services", icon: <Build /> },
                          { label: "About Us", path: "/aboutus", icon: <Info /> },
                        ].map((item, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => handleNavigate(item.path)}>
                              <ListItemIcon sx={{ color: "#111" }}>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 500, color: "#111" }} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Drawer>
                </>
              ) : (
                <>
                  {[
                    { label: "Home", path: "/", icon: <Home /> },
                    { label: "Services", path: "/services", icon: <Build /> },
                    { label: "About Us", path: "/aboutus", icon: <Info /> },
                    { label: "FAQ's", path: "/faq", icon: <Help /> },
                  ].map((item, i) => (
                    <Button
                      key={i}
                      onClick={() => handleNavigate(item.path)}
                      sx={{
                        color: theme.palette.text.primary,
                        mr: 2,
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        transition: "all 0.3s",
                        "&:hover": { backgroundColor: theme.palette.secondary.main, color: theme.palette.text.secondary },
                      }}
                    >
                      {item.icon} {item.label}
                    </Button>
                  ))}
                </>
              )}

              <IconButton
                onClick={handleAvatarClick}
                sx={{ color: theme.palette.text.primary, ml: 1, "&:hover": { color: theme.palette.secondary.main } }}
              >
                <PersonIcon fontSize="medium" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1,
                    borderRadius: "10px",
                    minWidth: 140,
                    boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleNavigate("/profile")}
                  sx={{ "&:hover": { backgroundColor: theme.palette.secondary.main, color: theme.palette.text.secondary } }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                {access ? (
                  <MenuItem
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      handleNavigate("/login");
                    }}
                    sx={{ "&:hover": { backgroundColor: theme.palette.secondary.main, color: theme.palette.text.secondary } }}
                  >
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => handleNavigate("/login")}
                    sx={{ "&:hover": { backgroundColor: theme.palette.secondary.main, color: theme.palette.text.secondary } }}
                  >
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    Login
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />
    </ThemeProvider>
  );
};

export default Navbar;
