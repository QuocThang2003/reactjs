import { useNavigate } from "react-router-dom";

const BookingFailure = () => {
    const navigate = useNavigate();

    return (
        <div className="container mt-5 text-center">
            <h3>❌ Thanh toán thất bại! Vui lòng thử lại.</h3>
            <button className="btn btn-danger mt-3" onClick={() => navigate("/")}>
                Quay về trang chủ
            </button>
        </div>
    );
};

export default BookingFailure;
