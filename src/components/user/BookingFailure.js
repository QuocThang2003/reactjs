import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const BookingFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <motion.div
                className="card shadow-lg p-4 text-center"
                style={{ maxWidth: "500px", borderRadius: "15px" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <FaTimesCircle className="text-danger mb-3" size={60} />
                <h3 className="text-danger mb-3">Thanh toán thất bại!</h3>
                <p className="text-muted">
                    Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại sau.
                </p>
                <motion.button
                    className="btn btn-danger mt-4"
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

export default BookingFailure;