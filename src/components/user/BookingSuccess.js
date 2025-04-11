import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const BookingSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const bookingId = urlParams.get("bookingId");

        if (bookingId) {
            localStorage.setItem("bookingId", bookingId);
        } else {
            console.warn("⚠ Không tìm thấy bookingId từ URL!");
        }
    }, []);

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <motion.div
                className="card shadow-lg p-4 text-center"
                style={{ maxWidth: "500px", borderRadius: "15px" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <FaCheckCircle className="text-success mb-3" size={60} />
                <h3 className="text-success mb-3">Thanh toán thành công!</h3>
                <p className="text-muted">
                    Cảm ơn bạn đã đặt tour. Chúng tôi đã ghi nhận thanh toán của bạn.
                </p>
                <motion.button
                    className="btn btn-primary mt-4"
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Quay về trang chủ
                </motion.button>
            </motion.div>
        </div>
    );
};

export default BookingSuccess;