import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post("http://localhost:5000/api/forgetpass/forgot-password", { email });
            setMessage(response.data.message);
        } catch (error) {
            setError(error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Quên Mật Khẩu</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Gửi Yêu Cầu</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
