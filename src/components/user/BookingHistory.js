import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Vui lòng đăng nhập để xem lịch sử giao dịch!");
                return;
            }

            const response = await axios.get("http://localhost:5000/api/users/booktour", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setBookings(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử đặt tour:", error);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Bạn có chắc chắn muốn hủy đơn này không?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Hủy đơn đặt tour thành công!");
            fetchBookings(); // Cập nhật lại danh sách sau khi hủy
        } catch (error) {
            alert("Lỗi khi hủy đơn: " + (error.response?.data?.message || "Không thể hủy đơn"));
        }
    };

    // Hàm lấy màu sắc theo trạng thái
    const getStatusBadge = (status) => {
        const statusColors = {
            Pending: "bg-warning",
            Paid: "bg-success",
            Cancelled: "bg-danger",
        };
        return statusColors[status] || "bg-secondary"; // Nếu không có trạng thái nào khớp, mặc định là xám
    };

    return (
        <>
            <Header />
            <div className="container mt-4">
                <h2 className="text-center mb-3">📜 Lịch sử đặt tour</h2>
                {bookings.length === 0 ? (
                    <p className="text-center text-muted">Bạn chưa đặt tour nào.</p>
                ) : (
                    <table className="table table-striped table-hover">
                        <thead className="table-primary">
                            <tr>
                                <th>STT</th>
                                <th>Tên Tour</th>
                                <th>Ngày Đặt</th>
                                <th>Tổng Tiền</th>
                                <th>Trạng Thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking._id}>
                                    <td>{index + 1}</td>
                                    <td>{booking.tourId?.tourName || "Không xác định"}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString("vi-VN")}</td>
                                    <td>{booking.total.toLocaleString("vi-VN") + " VND"}</td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleCancelBooking(booking._id)}
                                            disabled={booking.status !== "Pending"}
                                            title={booking.status !== "Pending" ? "Chỉ có thể hủy đơn đang chờ xử lý" : ""}
                                            style={{ opacity: booking.status === "Pending" ? 1 : 0.5 }}
                                        >
                                            Hủy đơn
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BookingHistory;
