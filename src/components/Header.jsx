import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/header-footer.css";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State cho menu hamburger

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            setUser({
                id: decodedToken.id,
                fullName: decodedToken.fullName,
            });
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link className="header-logo" to="/">TravelApp</Link>
                <button className="header-menu-toggle" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                </button>
                <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
                    <Link className="header-link" to="/bookingtour">Đặt Tour</Link>
                    <Link className="header-link" to="/bookinghistory">Xem Lịch Sử</Link>
                    <Link className="header-link" to="/contact">Liên Hệ</Link>
                    {!user ? (
                        <>
                            <Link className="header-btn header-btn-primary" to="/register">Đăng ký</Link>
                            <Link className="header-btn header-btn-secondary" to="/login">Đăng Nhập</Link>
                        </>
                    ) : (
                        <>
                            <span className="header-user">Xin chào, {user.fullName}</span>
                            <Link className="header-btn header-btn-warning" to="/update-profile">Cập nhật tài khoản</Link>
                            <button className="header-btn header-btn-logout" onClick={handleLogout}>Đăng xuất</button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;