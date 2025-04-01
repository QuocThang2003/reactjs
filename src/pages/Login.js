import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Thêm Link từ react-router-dom
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/loginuser.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            if (response?.data?.token) {
                localStorage.setItem("token", response.data.token);
                const decodedToken = jwtDecode(response.data.token);

                localStorage.setItem("user", JSON.stringify({
                    id: decodedToken.id,
                    fullName: decodedToken.fullName,
                    address: decodedToken.address,
                    phone: decodedToken.phone,
                }));

                navigate("/");
            } else {
                setError("Lỗi: Không có dữ liệu trả về từ API");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Email hoặc mật khẩu không chính xác!");
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    return (
        <>
            <Header />
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-title">LOGIN</h2>
                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <div className="input-container">
                                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="Nhập vào email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-container">
                                <FontAwesomeIcon icon={faLock} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {/* Thêm liên kết Quên mật khẩu */}
                        <div className="text-center">
                            <p className="forgot-password-link">
                                <Link to="/forgot-password">Quên mật khẩu?</Link>
                            </p>
                        </div>
                        <button type="submit" className="login-btn">
                            LOGIN
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="signup-text">Or Sign Up Using</p>
                        <div className="google-btn-container">
                            <button
                                type="button"
                                className="social-btn google-btn"
                                onClick={handleGoogleLogin}
                            >
                                <FontAwesomeIcon icon={faGoogle} />
                            </button>
                        </div>
                        <p className="signup-link">
                            <a href="/register">SIGN UP</a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;