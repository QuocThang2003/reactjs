import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import SearchTour from "./SearchTour"; // Assuming this is a custom search component
import { Spinner, Alert, Button } from "react-bootstrap";
import "../../styles/BookingTour.css"; // Import the CSS file

// Format date function
const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};

// Render star ratings
const renderStars = (rating) => {
    if (!rating || rating === 0) return <span className="text-muted">Chưa có đánh giá</span>;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }
    if (hasHalfStar) {
        stars.push(<FaStar key="half" className="text-warning" style={{ opacity: 0.5 }} />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaStar key={`empty-${i}`} className="text-muted" />);
    }
    return stars;
};

const BookingTour = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/tours/all-details")
            .then((response) => {
                setTours(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Không thể tải danh sách tour. Vui lòng thử lại sau!");
                setLoading(false);
            });
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <div className="container py-5 flex-grow-1">
                <h2 className="text-center text-primary fw-bold mb-4">Danh Sách Tour Du Lịch</h2>

                {/* Search Bar */}
                <SearchTour
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setTours={setTours}
                    allTours={tours}
                />

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-2">Đang tải dữ liệu...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <Alert variant="danger" className="text-center">
                        {error}
                        <Button
                            variant="outline-danger"
                            className="mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Thử lại
                        </Button>
                    </Alert>
                )}

                {/* Tour List */}
                {!loading && !error && (
                    <div className="row g-4">
                        {tours.length > 0 ? (
                            tours.map((tour) => (
                                <div key={tour.id || tour._id} className="col-md-4 col-sm-6">
                                    <div className="card h-100 shadow-sm border-0 tour-card">
                                        <img
                                            src={`http://localhost:5000/uploads/${tour.img}`}
                                            alt={tour.tourName}
                                            className="card-img-top rounded-top"
                                            onError={(e) => (e.target.src = "/default-image.jpg")}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-primary fw-semibold">
                                                {tour.tourName}
                                            </h5>
                                            <p className="card-text text-success mb-1">
                                                <FaMoneyBillWave className="me-1" />
                                                {tour.price.toLocaleString()} VND
                                            </p>
                                            <p className="card-text text-muted mb-1">
                                                <FaCalendarAlt className="me-1" />
                                                Khởi hành: <strong>{formatDate(tour.startDate)}</strong>
                                            </p>
                                            <p className="card-text text-muted mb-2">
                                                <FaCalendarAlt className="me-1" />
                                                Kết thúc: <strong>{formatDate(tour.endDate)}</strong>
                                            </p>
                                            <p className="card-text">
                                                {tour.rating && tour.rating.totalReviews > 0 ? (
                                                    <>
                                                        {renderStars(tour.rating.averageRating)}{" "}
                                                        <span className="fw-bold">
                                                            {tour.rating.averageRating}
                                                        </span>{" "}
                                                        ({tour.rating.totalReviews} đánh giá)
                                                    </>
                                                ) : (
                                                    <span className="text-muted">Chưa có đánh giá</span>
                                                )}
                                            </p>
                                            <Link
                                                to={`/tour/${tour.id || tour._id}`}
                                                className="btn btn-primary mt-auto w-100"
                                            >
                                                Đặt Tour Ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted py-5">
                                Không tìm thấy tour nào phù hợp.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default BookingTour;