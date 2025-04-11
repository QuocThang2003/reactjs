import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";

// Route yêu cầu người dùng phải đăng nhập
const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login"); // Nếu không có token, chuyển hướng về trang login
        }
    }, [token, navigate]); // useEffect chỉ chạy lại khi token hoặc navigate thay đổi

    if (!token) {
        return null; // Chưa có token, không render gì
    }

    return children; // Nếu có token, render các component con
};

// Route chỉ dành cho Admin
const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");

    if (role !== "admin") {
        navigate("/"); // Nếu không phải admin, chuyển hướng về trang chính
        return null; // Không render gì nếu không đủ quyền
    }

    return children;
};
// Middleware kiểm tra quyền Employee
const EmployeeRoute = ({ children }) => {
    const navigate = useNavigate();
    const role = sessionStorage.getItem("role");

    if (role !== "employee") {
        navigate("/"); // Nếu không phải employee, chuyển hướng về trang chính
        return null; // Không render gì nếu không đủ quyền
    }

    return children;
};

export { PrivateRoute, AdminRoute, EmployeeRoute };
