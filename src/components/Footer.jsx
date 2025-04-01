import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "../styles/header-footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">TravelApp</h3>
                    <p className="footer-text">
                        Khám phá thế giới với những hành trình tuyệt vời cùng TravelApp.
                    </p>
                </div>
                <div className="footer-section">
                    <h3 className="footer-title">Liên Kết Nhanh</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Trang Chủ</Link></li>
                        <li><Link to="/bookingtour">Đặt Tour</Link></li>
                        <li><Link to="/bookinghistory">Lịch Sử Đặt Tour</Link></li>
                        <li><Link to="/contact">Liên Hệ</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3 className="footer-title">Liên Hệ</h3>
                    <ul className="footer-contact">
                        <li>
                            <FontAwesomeIcon icon={faPhone} className="footer-icon" />
                            +84 123 456 789
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} className="footer-icon" />
                            support@travelapp.com
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-icon" />
                            123 Đường Du Lịch, TP. HCM
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} TravelApp. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;