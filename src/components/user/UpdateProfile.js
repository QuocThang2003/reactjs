import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { FaSave } from "react-icons/fa"; // Sử dụng icon từ react-icons thay vì FontAwesome
import "../../styles/UpdateProfile.css"; // Import file CSS riêng

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        const user = JSON.parse(sessionStorage.getItem("user"));

        if (!token || !user) {
            navigate("/login");
        } else {
            setFormData({
                fullName: user.fullName || "",
                phone: user.phone || "",
                address: user.address || "",
            });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/users/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Cập nhật thất bại!");
            }

            const currentUser = JSON.parse(localStorage.getItem("user")) || {};
            const updatedUser = {
                ...currentUser,
                fullName: data.user.fullName || currentUser.fullName,
                phone: data.user.phone || currentUser.phone,
                address: data.user.address || currentUser.address,
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            setFormData(updatedUser);
            setMessage("Cập nhật thành công!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="update-profile-section">
                <div className="update-profile-form">
                    <h2 className="update-profile-title">Cập nhật thông tin</h2>
                    {message && <p className="update-profile-message">{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="update-profile-btn">
                            <FaSave className="update-profile-icon" /> Cập nhật
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdateProfile;