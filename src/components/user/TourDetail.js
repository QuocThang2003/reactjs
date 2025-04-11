import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaInfoCircle, FaFolder } from "react-icons/fa"; // Thêm FaFolder cho danh mục
import Reviews from "./Reviews";
import Itineraries from "./Itineraries";
import Header from "../Header";
import Footer from "../Footer";
import { Spinner, Alert } from "react-bootstrap";
import "../../styles/TourDetail.css";

const TourDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [noReviewsMessage, setNoReviewsMessage] = useState("");
    const [noItinerariesMessage, setNoItinerariesMessage] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/tours/${id}`)
            .then((response) => setTour(response.data))
            .catch((error) => {
                console.error("Lỗi lấy chi tiết tour:", error);
                setError("Không thể tải chi tiết tour. Vui lòng thử lại sau!");
            });

        axios
            .get(`http://localhost:5000/api/reviews?tourId=${id}`)
            .then((response) => {
                if (response.data.message) setNoReviewsMessage(response.data.message);
                else setReviews(response.data);
            })
            .catch((error) => console.error("Lỗi lấy danh sách đánh giá:", error));

        axios
            .get(`http://localhost:5000/api/itineraries/tours/${id}`)
            .then((response) => {
                if (response.data.message) setNoItinerariesMessage(response.data.message);
                else setItineraries(response.data);
            })
            .catch((error) => console.error("Lỗi lấy danh sách lịch trình:", error));
    }, [id]);

    const handleReviewAdded = (newReview) => {
        setReviews([newReview, ...reviews]);
        window.location.reload();
    };

    const formatDate = (dateString) =>
        dateString ? new Date(dateString).toLocaleDateString("vi-VN") : "N/A";

    if (error) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className="container py-5 flex-grow-1">
                    <Alert variant="danger" className="text-center">
                        {error}
                        <button
                            className="btn btn-outline-danger mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Thử lại
                        </button>
                    </Alert>
                </div>
                <Footer />
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <div className="container py-5 flex-grow-1 text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-primary">Đang tải dữ liệu...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container py-5 flex-grow-1">
                {/* Tour Overview */}
                <div className="row g-4 align-items-start mb-5">
                    <div className="col-lg-6">
                        <div className="tour-image-container shadow-sm">
                            <img
                                src={`http://localhost:5000/uploads/${tour.img}`}
                                alt={tour.tourName}
                                className="img-fluid rounded"
                                onError={(e) => (e.target.src = "/default-image.jpg")}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm p-4 tour-details-card">
                            <h1 className="text-primary fw-bold mb-3">{tour.tourName}</h1>
                            <hr className="my-4" />
                            <p className="d-flex align-items-center mb-3">
                                <FaInfoCircle className="text-warning me-2" />
                                <span><strong>Mô tả:</strong> {tour.description}</span>
                            </p>
                            <p className="d-flex align-items-center mb-3">
                                <FaMoneyBillWave className="text-success me-2" />
                                <span>
                                    <strong>Giá:</strong>{" "}
                                    <span className="text-danger fw-bold">
                                        {tour.price.toLocaleString()} VNĐ
                                    </span>
                                </span>
                            </p>
                            <p className="d-flex align-items-center mb-3">
                                <FaUsers className="text-info me-2" />
                                <span><strong>Số lượng:</strong> {tour.quantity} người</span>
                            </p>
                            <p className="d-flex align-items-center mb-3">
                                <FaCalendarAlt className="text-secondary me-2" />
                                <span>
                                    <strong>Thời gian:</strong> {formatDate(tour.startDate)} -{" "}
                                    {formatDate(tour.endDate)}
                                </span>
                            </p>
                            <p className="d-flex align-items-center mb-4">
                                <FaFolder className="text-primary me-2" />
                                <span>
                                    <strong>Danh mục:</strong>{" "}
                                    {tour.category?.categoryName || "Không có danh mục"}
                                </span>
                            </p>
                            <button
                                className="btn btn-primary w-100 btn-book-now"
                                onClick={() => navigate(`/booking/${id}`)}
                            >
                                Đặt Ngay
                            </button>
                        </div>
                    </div>
                </div>

                {/* Itineraries and Reviews */}
                <Itineraries itineraries={itineraries} noItinerariesMessage={noItinerariesMessage} />
                <Reviews
                    reviews={reviews}
                    noReviewsMessage={noReviewsMessage}
                    tourId={id}
                    onReviewAdded={handleReviewAdded}
                />
            </div>
            <Footer />
        </div>
    );
};

export default TourDetail;