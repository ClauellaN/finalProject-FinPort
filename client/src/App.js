import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./pages/header";
import Footer from "./pages/footer";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Manage from "./components/ManageAccount"; 
import Faq from "./components/Faq";
import Home from "./components/Home";
import PaymentPage from "./pages/PaymentPage";
import SearchClient from "./components/SearchClient"; 
import CloseAccount from "./components/CloseAccount";
import ClientLayout from "./components/ClientLayout";
import Report from "./components/Reports";

const App = () => {
  const location = useLocation();

  return (
    <>
      {/* Only show Header if the current path is NOT "/", "/login", or "/registration" */}
      {location.pathname !== "/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" && <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/manage" element={<Manage />} />{" "}
        {/* This will be the Manage component without SearchClient */}
        <Route path="/reports" element={<Report />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/payment/:clientId" element={<PaymentPage />} />
        {/* <Route path="/activity/:clientId" element={<Activity />} /> */}
        <Route path="/account-details/:clientId" element={<SearchClient />} />
        <Route path="/manage-account/:clientId" element={<ClientLayout />} />
        <Route path="/closeaccount/:clientId" element={<CloseAccount />} />
      </Routes>
      <Footer />
    </>
  );
};

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

