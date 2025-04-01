import { useState, useEffect } from "react"; // Thêm useEffect để gọi API
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/bookingform.css";
import { FaTicketAlt, FaSpinner, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

const BookingForm = () => {
    const { tourId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [tourPrice, setTourPrice] = useState(null); // Lưu giá tour từ API
    const [error, setError] = useState(null); // Lưu lỗi nếu có

    // Lấy giá tour từ API khi component mount
    useEffect(() => {
        const fetchTourPrice = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tours/${tourId}`);
                setTourPrice(response.data.price); // Lấy giá từ dữ liệu tour
            } catch (error) {
                console.error("Lỗi lấy giá tour:", error.response?.data || error.message);
                setError("Không thể tải giá tour. Vui lòng thử lại!");
            }
        };

        fetchTourPrice();
    }, [tourId]);

    // Tính tổng tiền dựa trên giá tour thực tế
    const totalPrice = tourPrice ? tourPrice * quantity : 0;

    const handleBooking = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Bạn cần đăng nhập để đặt tour!");
            return;
        }

        if (!tourPrice) {
            alert("Không thể xác định giá tour. Vui lòng thử lại!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:5000/api/bookings",
                { tourId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.bookingId) {
                const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
                const newBooking = {
                    bookingId: response.data.bookingId,
                    tourId: tourId,
                    createdAt: new Date().toISOString(),
                };
                const updatedBookings = [...existingBookings, newBooking];
                localStorage.setItem("bookings", JSON.stringify(updatedBookings));
            }

            if (response.data.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            } else {
                navigate("/booking-success");
            }
        } catch (error) {
            console.error("❌ Đặt tour thất bại:", error.response?.data || error.message);
            alert("Đặt tour thất bại! Hãy thử lại.");
            navigate("/booking-failure");
        } finally {
            setLoading(false);
        }
    };

    // Nếu có lỗi hoặc đang tải giá
    if (error) {
        return (
            <div className="booking-container">
                <div className="booking-card text-center p-4">
                    <p className="text-danger">{error}</p>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => window.location.reload()}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    if (!tourPrice) {
        return (
            <div className="booking-container">
                <div className="booking-card text-center p-4">
                    <FaSpinner className="spinner" />
                    <p className="text-muted mt-2">Đang tải giá tour...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-container">
            <motion.div
                className="booking-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="card-body p-4">
                    <h3 className="booking-title">
                        <FaTicketAlt className="me-2" /> Đặt Tour
                    </h3>
                    <div className="booking-input-group">
                        <label className="booking-label">Số lượng vé:</label>
                        <input
                            type="number"
                            className="booking-input"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                        />
                    </div>
                    <div className="booking-price-info">
                        <p className="booking-price-text">
                            Giá mỗi vé:{" "}
                            <span className="booking-price-value">
                                {tourPrice.toLocaleString()} VNĐ
                            </span>
                        </p>
                        <p className="booking-price-text">
                            Tổng tiền:{" "}
                            <span className="booking-price-value">
                                {totalPrice.toLocaleString()} VNĐ
                            </span>
                        </p>
                    </div>
                    <motion.button
                        className={`booking-button ${loading ? "booking-button-disabled" : ""}`}
                        onClick={handleBooking}
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="booking-spinner" />
                                Đang xử lý...
                            </>
                        ) : (
                            <>
                                <FaMoneyBillWave className="me-2" /> Thanh toán ngay
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingForm;