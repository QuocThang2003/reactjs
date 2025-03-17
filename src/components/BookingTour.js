import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Hàm định dạng ngày thành dd/MM/yyyy
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", { 
        day: "2-digit", month: "2-digit", year: "numeric"
    });
};

// Hiển thị số sao phù hợp với đánh giá
const renderStars = (rating) => {
    if (rating === 0 || rating === undefined || rating === null) return null;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }

    if (hasHalfStar) {
        stars.push(<FaStar key="half-star" className="text-warning" style={{ opacity: 0.5 }} />);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaStar key={`empty-${i}`} className="text-secondary" />);
    }

    return stars;
};

const BookingTour = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tours/all-details`)
            .then(response => {
                setTours(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Không thể tải danh sách tour. Vui lòng thử lại!");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <Header />

            <div className="container py-5">
                <h2 className="text-center text-primary fw-bold">Danh sách Tour</h2>

                {loading ? (
                    <h2 className="text-center text-primary py-5">Đang tải...</h2>
                ) : error ? (
                    <h2 className="text-center text-danger py-5">{error}</h2>
                ) : (
                    <div className="row">
                        {tours.map((tour, index) => (
                            <div key={tour.id || tour._id || index} className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img 
                                        src={`http://localhost:5000/uploads/${tour.img}`} 
                                        alt={tour.tourName} 
                                        className="card-img-top img-fluid rounded" 
                                        style={{ height: "200px", objectFit: "cover" }} 
                                        onError={(e) => { e.target.src = "/default-image.jpg"; }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{tour.tourName}</h5>
                                        <p className="card-text">
                                            <FaMoneyBillWave /> Giá: {tour.price.toLocaleString()} VND
                                        </p>
                                        <p className="card-text">
                                            <FaCalendarAlt /> Ngày khởi hành: <strong>{formatDate(tour.startDate)}</strong>
                                        </p>
                                        <p className="card-text">
                                            <FaCalendarAlt /> Ngày kết thúc: <strong>{formatDate(tour.endDate)}</strong>
                                        </p>
                                        {tour.rating && tour.rating.totalReviews > 0 ? (
                                            <p className="card-text">
                                                {renderStars(tour.rating.averageRating)} <strong>{tour.rating.averageRating}</strong> 🖊️ ({tour.rating.totalReviews} đánh giá)
                                            </p>
                                        ) : (
                                            <p className="card-text text-muted">Chưa có đánh giá</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BookingTour;
