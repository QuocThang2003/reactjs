import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Thêm state để hiển thị lỗi

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(""); // Reset lỗi trước khi gọi API

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            if (response?.data?.token) {
                localStorage.setItem("token", response.data.token); // Lưu token vào localStorage
                
                // Giải mã token để lấy thông tin người dùng từ token
                const decodedToken = jwtDecode(response.data.token);

                localStorage.setItem("user", JSON.stringify({ 
                    id: decodedToken.id, 
                    fullName: decodedToken.fullName 
                })); // Lưu thông tin người dùng từ token vào localStorage

                console.log("Đăng nhập thành công:", response.data);
                navigate("/"); // Điều hướng đến trang chính
            } else {
                setError("Lỗi: Không có dữ liệu trả về từ API");
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            setError("Email hoặc mật khẩu không chính xác!"); // Hiển thị lỗi lên UI
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-gradient"
            style={{ background: "linear-gradient(to bottom, #4b0082, #0000ff)" }}
        >
            <div className="bg-white p-4 rounded shadow-lg w-25">
                <h2 className="text-center text-primary">Đăng Nhập</h2>
                <div
                    className="mx-auto my-2"
                    style={{ width: "50px", height: "3px", backgroundColor: "#4b0082" }}
                ></div>

                {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div className="input-group">
                            <span className="input-group-text">📧</span>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Mật khẩu</label>
                        <div className="input-group">
                            <span className="input-group-text">🔒</span>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Nút và link */}
                    <div className="d-flex justify-content-between align-items-center">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate("/register")}
                        >
                            Đăng ký
                        </button>
                        <a href="/forgot-password" className="text-decoration-none">
                                     Quên mật khẩu?
                        </a>
                        <button type="submit" className="btn btn-primary">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
