import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../Header";
import Footer from "../Footer";
import "../../styles/ContactForm.css"; // Import file CSS riêng

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
    });

    const [errors, setErrors] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone) => /^0\d{9}$/.test(phone);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors("");
        setSuccessMessage("");

        if (!isValidEmail(formData.email)) {
            setErrors("Email không hợp lệ!");
            return;
        }
        if (!isValidPhone(formData.phone)) {
            setErrors("Số điện thoại không hợp lệ!");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/contact/send", formData);
            setSuccessMessage("Gửi thành công!");
            setFormData({ fullName: "", email: "", phone: "", address: "", message: "" });
        } catch (error) {
            setErrors(error.response?.data?.error || "Có lỗi xảy ra khi gửi liên hệ!");
        }
    };

    return (
        <>
            <Header />
            <div className="contact-section">
                <div className="contact-header">
                    <h2 className="contact-title">Liên Hệ Với Chúng Tôi</h2>
                    <p className="contact-subtitle">
                        Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ ngay với chúng tôi qua các kênh dưới đây.
                    </p>
                </div>

                {/* Thông tin liên hệ */}
                <div className="contact-info">
                    <div className="contact-info-item">
                        <FaPhone className="contact-icon" />
                        <h5>Điện thoại</h5>
                        <p>+84 123 456 789</p>
                    </div>
                    <div className="contact-info-item">
                        <FaEnvelope className="contact-icon" />
                        <h5>Email</h5>
                        <p>support@example.com</p>
                    </div>
                    <div className="contact-info-item">
                        <FaMapMarkerAlt className="contact-icon" />
                        <h5>Địa chỉ</h5>
                        <p>123 Đường ABC, TP. Hồ Chí Minh</p>
                    </div>
                </div>

                {/* Form và Bản đồ */}
                <div className="contact-content">
                    <div className="contact-form">
                        {errors && <div className="contact-error">{errors}</div>}
                        {successMessage && <div className="contact-success">{successMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Họ tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
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
                            <div className="form-group">
                                <label>Nội dung</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="contact-submit-btn">Gửi</button>
                        </form>
                    </div>

                    <div className="contact-map">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.940283450187!2d106.68231437481835!3d10.816642458604642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528c36b593f11%3A0x5a0a9db84b33e1c2!2zUXXhuq1uIDcsIFBoxrDhu51uZyAxNiwgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBIw6BuaCwgVmnhu4d0IE5hbQ!5e0!3m2!1sen!2s!4v1711629999999!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactForm;