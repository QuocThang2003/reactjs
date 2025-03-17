import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TourDetail from "./components/TourDetail";
import BookingTour from "./components/BookingTour";
import BookingHistory from "./components/BookingHistory";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import ForgotPassword from "./pages/ForgotPassword"; 
import ResetPassword from "./pages/ResetPassword"; 


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tour/:id" element={<TourDetail />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/bookingTour" element={<BookingTour />} /> 
                <Route path="/bookinghistory" element={<BookingHistory />} /> 

            </Routes>
        </Router>
    );
}

export default App;
