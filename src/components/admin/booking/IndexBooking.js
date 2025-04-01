import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar"; 
import BookingDetail from "./BookingDetail"; 

const IndexBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const role = localStorage.getItem("role");

                if (!token) {
                    setError("Bạn chưa đăng nhập!");
                    return navigate("/login"); 
                }

                if (role !== "admin") {
                    setError("Bạn không có quyền truy cập!");
                    return navigate("/");
                }

                const response = await axios.get("http://localhost:5000/api/bookings/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBookings(response.data.bookings);
            } catch (err) {
                setError(err.response?.data?.message || "Lỗi khi lấy danh sách đặt tour.");
            }
        };

        fetchBookings();
    }, [navigate]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 bg-light vh-100 p-3">
                    <AdminSidebar />
                </div>

                <div className="col-md-9 mt-4">
                    <div className="card shadow-sm rounded p-4">
                        <h2 className="text-center mb-4 text-primary">Danh Sách Đơn Đặt Tour</h2>
                        {error && <p className="text-danger text-center">{error}</p>}

                        <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Khách Hàng</th>
                                        <th>Tour</th>
                                        <th>Tổng Tiền</th>
                                        <th>Ngày Đặt</th>
                                        <th>Trạng Thái</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {bookings.length > 0 ? (
                                    bookings.map((booking, index) => (
                                        <tr key={booking._id}>
                                            <td>{index + 1}</td>
                                            <td>{booking.fullname || "Không có tên"}</td>
                                            <td>{booking.tourName || "Không có tour"}</td>
                                            <td>{booking.total.toLocaleString()} VNĐ</td>
                                            <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        booking.status === "Pending"
                                                            ? "bg-warning text-dark"
                                                            : booking.status === "Paid"
                                                            ? "bg-success"
                                                            : booking.status === "Cancelled"
                                                            ? "bg-danger"
                                                            : "bg-secondary"
                                                    }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-info btn-sm"
                                                    onClick={() => setSelectedBookingId(booking._id)}
                                                >
                                                    Xem Chi Tiết
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Hiển thị chi tiết đơn đặt tour khi chọn */}
                    {selectedBookingId && (
                        <BookingDetail bookingId={selectedBookingId} onClose={() => setSelectedBookingId(null)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default IndexBooking;
