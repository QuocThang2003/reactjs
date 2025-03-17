import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";  

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token"); // Lấy token từ query params

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/forgetpass/reset-password", {
                token,
                password,
                confirmPassword,
            });
            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Đặt Lại Mật Khẩu</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Mật Khẩu Mới</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label>Nhập Lại Mật Khẩu</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Đặt Lại Mật Khẩu</button>
            </form>
        </div>
    );
};

export default ResetPassword;
