import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TourDetail from "./components/user/TourDetail";
import BookingTour from "./components/user/BookingTour";
import BookingHistory from "./components/user/BookingHistory";
import BookingForm from "./components/user/BookingForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GoogleAuthHandler from "./components/user/GoogleAuthHandler";
import BookingSuccess from "./components/user/BookingSuccess";
import BookingFailure from "./components/user/BookingFailure";
import UpdateProfile from "./components/user/UpdateProfile";
import ContactForm from "./components/user/ContactForm";
import IndexContact from "./components/admin/contact/IndexContact";
import IndexTour from "./components/employee/tour/IndexTour";
import ItineraryList from "./components/employee/itineraries/ItineraryList";
import IndexEmployee from "./components/admin/Manager/IndexEmployee";
import IndexUser from "./components/admin/user/IndexUser";
import IndexBooking from "./components/admin/booking/IndexBooking";
import IndexCategory from "./components/employee/category/IndexCategory";
import BarChart from "./components/admin/booking/BarChart";
import LoginForm from "./components/LoginForm";
import AdminSidebar from "./components/admin/AdminSidebar";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import { PrivateRoute, AdminRoute, EmployeeRoute } from "./middlewares/PrivateRoute"; 


function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/tour/:id" element={<TourDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/google-auth" element={<GoogleAuthHandler />} />
                <Route path="/bookingtour" element={<BookingTour />} />
                <Route path="/login/admin" element={<LoginForm />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/contact" element={<ContactForm />} />
                
                {/* Private Routes */}
                <Route
                    path="/bookinghistory"
                    element={
                        <PrivateRoute>
                            <BookingHistory />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/booking/:tourId"
                    element={
                        <PrivateRoute>
                            <BookingForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/booking-success"
                    element={
                        <PrivateRoute>
                            <BookingSuccess />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/booking-failure"
                    element={
                        <PrivateRoute>
                            <BookingFailure />
                        </PrivateRoute>
                    }
                />

                {/* Admin-only Routes */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminSidebar />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/employees"
                    element={
                        <AdminRoute>
                            <IndexEmployee />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <AdminRoute>
                            <IndexUser/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/admin/contact"
                    element={
                        <AdminRoute>
                            <IndexContact/>
                        </AdminRoute>
                    }
                />
                 <Route
                    path="/admin/booking"
                    element={
                        <AdminRoute>
                            <IndexBooking/>
                        </AdminRoute>
                    }
                />
                  <Route
                    path="/admin/barchart"
                    element={
                        <AdminRoute>
                            <BarChart/>
                        </AdminRoute>
                    }
                />
                {/* Employee-only Routes */}
                <Route
                    path="/employee/dashboard"
                    element={
                        <EmployeeRoute>
                            <EmployeeDashboard />
                        </EmployeeRoute>
                    }
                />
                <Route 
                    path="/employee/tours" 
                    element={
                        <EmployeeRoute>
                            <IndexTour />
                        </EmployeeRoute>
                    } 
                />
                 <Route 
                    path="/employee/itineraries" 
                    element={
                        <EmployeeRoute>
                            <ItineraryList />
                        </EmployeeRoute>
                    } 
                />
                <Route 
                    path="/employee/categories" 
                    element={
                        <EmployeeRoute>
                            <IndexCategory />
                        </EmployeeRoute>
                    } 
                />
            </Routes>
            
        </Router>
    );
}

export default App;
