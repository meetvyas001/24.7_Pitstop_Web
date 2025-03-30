import { BrowserRouter, Route, Routes } from "react-router-dom"; // Corrected import path
import "./App.css"; // Global CSS styles
import "font-awesome/css/font-awesome.min.css"; // Font-awesome styles
// Importing pages and components
import Home from "./Pages/Home";
//import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import RegisterComplainService from "./Pages/RegisterComplainService";
import NotFound from "./Pages/NotFound"; // 404 Page not found component
import AboutUs from "./Pages/AboutUs"; // Importing the About page component
import Services from "./Pages/Services";
import MechanicDashboard from "./Pages/MechanicDashboard";
import MechanicSignInForm from "./Components/MechanicSignInForm";
import MechanicSignUpForm from "./Components/MechanicSignUpForm";
import AdminSignInForm from "./Components/AdminSignInForm";
import AdminDashboard from "./Pages/AdminDashboard";
import Profile from "./Pages/Profile";
import PaymentPage from "./Pages/PaymentPage";
import MechanicsSearchPage from "./Pages/MechanicsSearchPage";
import FaqSection from "./Components/FaqSection";
import TermsAndConditions from "./Components/termsandconditions";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import { Dashboard } from "@mui/icons-material";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/home" element={<Home />} /> */}

          {/* User-Login */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/register/problem" element={<RegisterComplainService />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/faq" element={<FaqSection />} />
          <Route path="/search/mechanics" element={<MechanicsSearchPage />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          
          {/* Admin */}
          <Route path="/admin/login" element={<AdminSignInForm />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Mechanic */}
          <Route path="/mechanic/login" element={<MechanicSignInForm />} />
          <Route path="/mechanic/Register" element={<MechanicSignUpForm />} />
          <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Catch-all route for 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
