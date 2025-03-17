import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/home.css";
const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({
                id: decodedToken.id,
                fullName: decodedToken.fullName
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">Home</Link>
                <div className="ml-auto">
                    {!user ? (
                        <>
                            <Link className="btn btn-light mx-2" to="/register">Đăng ký</Link>
                            <Link className="btn btn-light mx-2" to="/login">Đăng Nhập</Link>
                        </>
                    ) : (
                        <>
                            <span className="navbar-text text-light mx-2">Xin chào, {user.fullName}</span>
                            <button className="btn btn-light mx-2" onClick={handleLogout}>Đăng xuất</button>
                        </>
                    )}
                    <Link className="btn btn-light mx-2" to="/bookingtour">Đặt Tour</Link>
                    <Link className="btn btn-light mx-2" to="/bookinghistory">Xem Lịch Sử</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
