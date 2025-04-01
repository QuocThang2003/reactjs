import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="container mt-5 text-center">
            <h3>Thanh toán thành công!</h3>
            <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                Quay về trang chủ
            </button>
        </div>
    );
};

export default BookingSuccess;
