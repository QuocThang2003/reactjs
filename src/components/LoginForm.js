import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons"; // Thay MailOutlined bằng UserOutlined
import "../styles/login.css";

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/employees/login", {
                username,
                password,
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);

                if (data.role === "admin") {
                    navigate("/admin/dashboard");
                } else if (data.role === "employee") {
                    navigate("/employee/dashboard");
                }
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Lỗi kết nối đến máy chủ");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h3 className="login-title">Quản Lý</h3>
                {error && (
                    <div className="login-error">
                        {error}
                    </div>
                )}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group input-container">
                        <UserOutlined className="input-icon" />
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            placeholder="Nhập vào thông tin tài khoản" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group input-container">
                        <LockOutlined className="input-icon" />
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;