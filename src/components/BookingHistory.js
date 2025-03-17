import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
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

                setBookings(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy lịch sử đặt tour:", error);
            }
        };

        fetchBookings();
    }, []);

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
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking._id}>
                                    <td>{index + 1}</td>
                                    <td>{booking.tourId.tourName}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString("vi-VN")}</td>
                                    <td>{booking.total.toLocaleString("vi-VN")} VND</td>
                                    <td>
                                        <span className={`badge ${booking.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                                            {booking.status}
                                        </span>
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
