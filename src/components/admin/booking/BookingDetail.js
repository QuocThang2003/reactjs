import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingDetail = ({ bookingId, onClose }) => {
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBooking(response.data.booking);
            } catch (err) {
                setError(err.response?.data?.error || "Lỗi khi lấy thông tin đơn đặt tour.");
            }
        };

        if (bookingId) {
            fetchBooking();
        }
    }, [bookingId]);

    if (!booking) return <p className="text-center text-muted">{error || "Đang tải..."}</p>;

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Chi Tiết Đơn Đặt Tour</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Khách hàng:</strong> {booking.fullname }</p>
                        <p><strong>Tour:</strong> {booking.tourName}</p>
                        <p><strong>Tổng tiền:</strong> {booking.total.toLocaleString()} VNĐ</p>
                        <p><strong>Ngày đặt:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                        <p><strong>Trạng thái:</strong> {booking.status}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetail;
