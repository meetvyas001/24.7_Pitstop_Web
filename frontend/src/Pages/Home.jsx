import React, { useEffect } from "react";
import { keyframes } from "@emotion/react";
import { Global } from "@emotion/react";
import { CssBaseline, Box, Typography, Button } from "@mui/material";
import Services from "../Pages/Service";
import About from "../Pages/About";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";
import BG from "../../src/Assets/header.png";

// ✅ Cloud animation
const moveClouds = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const Home = () => {
  const access = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!access) {
      navigate("/login");
    }
  }, []);

  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.4 });
  const [refSubtitle, inViewSubtitle] = useInView({ triggerOnce: true, threshold: 0.4 });
  const [refAbout, inViewAbout] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          bgcolor: "black",
        }}
      >
        <CssBaseline />
        <Global
          styles={`
            @import url('https://fonts.cdnfonts.com/css/ica-rubrik-black');
            @import url('https://fonts.cdnfonts.com/css/poppins');

            body {
              font-family: 'Poppins', sans-serif;
            }

            .presentation-title {
              font-family: 'ICA Rubrik Black', sans-serif;
            }

            @keyframes pulseGlow {
              0% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.1); opacity: 1; }
              100% { transform: scale(1); opacity: 0.7; }
            }

            @keyframes floatBtn {
              0% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
              100% { transform: translateY(0); }
            }
          `}
        />

        {/* ✅ Background Image Layer */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${BG})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />

        {/* ✅ Enhanced Multi-layered Clouds */}
        {[0, 1, 2].map((layer, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "300%",
              height: "100%",
              backgroundImage: "url(http://demos.creative-tim.com/paper-kit-2/assets/img/clouds.png)",
              backgroundRepeat: "repeat-x",
              backgroundSize: "cover",
              animation: `${moveClouds} ${100 + index * 30}s linear infinite`,
              opacity: 0.3 + index * 0.2,
              zIndex: 1,
              filter: "sepia(1) saturate(4) hue-rotate(180deg)",
              transform: `translateY(${index * 20}px)`,
            }}
          />
        ))}

        {/* ✅ Glowing Ring */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #00e0ff33, #00000000)",
            animation: "pulseGlow 4s ease-in-out infinite",
            zIndex: 2,
          }}
        />

        {/* ✅ Hero Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            color: "#fff",
            position: "relative",
            zIndex: 3,
            padding: "0 20px",
            perspective: "1000px",
          }}
        >
          <Typography
            ref={refTitle}
            variant="h1"
            component="h1"
            className="presentation-title"
            sx={{
              mb: 2,
              transform: inViewTitle
                ? "rotateX(0deg) scale(1)"
                : "rotateX(90deg) scale(0.7)",
              opacity: inViewTitle ? 1 : 0,
              transition: "all 1s ease-in-out",
              textShadow: "0 0 10px #00e0ff, 0 0 20px #00e0ff, 0 0 40px #00e0ff",
            }}
            color="white"
          >
            24/7 PITSTOP
          </Typography>

          <Typography
            ref={refSubtitle}
            variant="h4"
            component="h2"
            sx={{
              mb: 4,
              transform: inViewSubtitle
                ? "rotateY(0deg) translateY(0)"
                : "rotateY(90deg) translateY(20px)",
              opacity: inViewSubtitle ? 1 : 0,
              transition: "all 1s ease-in-out",
              textShadow: "0 0 5px #00e0ff, 0 0 15px #00e0ff",
            }}
          >
            "Day or Night, We Keep You Moving"
          </Typography>
        </Box>
      </Box>

      {/* ✅ About Section */}
      <Box
        ref={refAbout}
        sx={{
          opacity: inViewAbout ? 1 : 0,
          transform: inViewAbout ? "translateY(0)" : "translateY(50px)",
          transition: "all 1s ease-in-out",
        }}
      >
        <About />
      </Box>

      {/* ✅ Floating Button */}
      <Box sx={{ m: 2, display: "flex", justifyContent: "center" }}>
        <Button
          sx={{
            background: "black",
            color: "white",
            px: 3,
            py: 1,
            borderRadius: "30px",
            transition: "all 0.3s ease",
            boxShadow: "0 0 10px #00e0ff66",
            animation: "floatBtn 3s ease-in-out infinite",
            "&:hover": {
              background: "#00e0ff",
              color: "black",
              transform: "scale(1.05)",
            },
          }}
          onClick={() => navigate("/services")}
        >
          Go To Services
        </Button>
      </Box>

      {/* ✅ Why Choose Us */}
      <Box sx={{ py: 8, bgcolor: "#f8f9fa", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
          We offer a wide range of reliable and round-the-clock vehicle services that keep your journey smooth and stress-free.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {[
            { title: "24/7 Support", icon: "https://img.icons8.com/fluency/96/000000/online-support.png" },
            { title: "Expert Technicians", icon: "https://img.icons8.com/fluency/96/000000/maintenance.png" },
            { title: "Quick Service", icon: "https://img.icons8.com/fluency/96/000000/speed.png" },
          ].map((item, idx) => (
            <Box key={idx} sx={{ maxWidth: 180 }}>
              <img src={item.icon} alt={item.title} width={80} style={{ marginBottom: 16 }} />
              <Typography fontWeight={600}>{item.title}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ✅ Services Showcase */}
      <Box sx={{ py: 8, backgroundColor: "#ffffff", textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Our Top Services
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt: 4,
          }}
        >
          {[
            {
              title: "Battery Jumpstart",
              image: "https://th.bing.com/th/id/OIP.DaXHTBqmlXglEQtH8M8xdwHaEK?rs=1&pid=ImgDetMain",
            },
            {
              title: "Flat Tire Change",
              image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=80",
            },
            {
              title: "Engine Service",
              image: "https://pmmonline.co.uk/wp-content/uploads/2019/03/mahle-aftermarket-main.jpg",
            },
          ].map((service, index) => (
            <Box
              key={index}
              sx={{
                width: 280,
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                borderRadius: 2,
                overflow: "hidden",
                textAlign: "left",
              }}
            >
              <img src={service.image} alt={service.title} width="100%" height={180} />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  {service.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ✅ Testimonials */}
      <Box sx={{ py: 8, backgroundColor: "#f1f1f1", textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          What Our Customers Say
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt: 4,
          }}
        >
          {[
            {
              name: "Rohit Kumar",
              feedback: "Excellent service! They rescued me late at night when I had a flat tire.",
              avatar: "https://randomuser.me/api/portraits/men/75.jpg",
            },
            {
              name: "Sneha Sharma",
              feedback: "Super fast response and very polite staff. Highly recommended!",
              avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Arjun Verma",
              feedback: "Affordable and reliable! Would definitely use their services again.",
              avatar: "https://randomuser.me/api/portraits/men/50.jpg",
            },
          ].map((testimonial, i) => (
            <Box
              key={i}
              sx={{
                width: 300,
                p: 3,
                bgcolor: "#fff",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "left",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%", marginRight: 12 }}
                />
                <Typography variant="subtitle1" fontWeight={600}>
                  {testimonial.name}
                </Typography>
              </Box>
              <Typography variant="body2">{testimonial.feedback}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default Home;
