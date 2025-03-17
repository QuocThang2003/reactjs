import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import Reviews from "./Reviews";
import Itineraries from "./Itineraries";
import Header from "./Header";  // Import Header
import Footer from "./Footer";  // Import Footer

const TourDetail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [reviews, setReviews] = useState([]); 
    const [itineraries, setItineraries] = useState([]);
    const [noReviewsMessage, setNoReviewsMessage] = useState('');
    const [noItinerariesMessage, setNoItinerariesMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tours/${id}`)
            .then(response => setTour(response.data))
            .catch(error => console.error("Lỗi lấy chi tiết tour:", error));

        axios.get(`http://localhost:5000/api/reviews?tourId=${id}`)
            .then(response => {
                if (response.data.message) setNoReviewsMessage(response.data.message);
                else setReviews(response.data);
            })
            .catch(error => console.error("Lỗi lấy danh sách đánh giá:", error));

        axios.get(`http://localhost:5000/api/itineraries/tours/${id}`)
            .then(response => {
                if (response.data.message) setNoItinerariesMessage(response.data.message);
                else setItineraries(response.data);
            })
            .catch(error => console.error("Lỗi lấy danh sách lịch trình:", error));
    }, [id]);

    if (!tour) return <p className="text-center text-primary">Đang tải dữ liệu...</p>;

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString("vi-VN") : "";
    };

    return (
        <>
            <Header />
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img 
                            src={`http://localhost:5000/uploads/${tour.img}`} 
                            alt={tour.tourName} 
                            className="img-fluid rounded shadow"
                            style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: "450px" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="text-primary fw-bold">{tour.tourName}</h2>
                        <hr />
                        <p><FaInfoCircle className="text-warning me-2" /><strong>Mô tả:</strong> {tour.description}</p>
                        <p><FaMoneyBillWave className="text-success me-2" /><strong>Giá:</strong> <span className="text-danger fw-bold">{tour.price} VNĐ</span></p>
                        <p><FaUsers className="text-info me-2" /><strong>Số lượng:</strong> {tour.quantity}</p>
                        <p><FaCalendarAlt className="text-secondary me-2" /><strong>Thời gian:</strong> {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
                        <button className="btn btn-primary w-100 mt-3">Đặt Ngay</button>
                    </div>
                </div>

                <Itineraries itineraries={itineraries} noItinerariesMessage={noItinerariesMessage} />
                <Reviews reviews={reviews} noReviewsMessage={noReviewsMessage} />
            </div>
            <Footer />
        </>
    );
};

export default TourDetail;
