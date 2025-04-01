import React, { useState, useEffect } from "react";
import { FaUser, FaStar } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const renderStars = (rating, setRating, interactive = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FaStar
                key={i}
                className={i <= rating ? "text-warning" : "text-muted"}
                onClick={() => interactive && setRating(i)}
                style={{ cursor: interactive ? "pointer" : "default", marginRight: "5px" }}
            />
        );
    }
    return stars;
};

const Reviews = ({ reviews, noReviewsMessage, tourId, onReviewAdded }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [canReview, setCanReview] = useState(false);
    const [loading, setLoading] = useState(false); // Chỉ loading khi gửi, không cần khi kiểm tra ban đầu

    useEffect(() => {
        const checkUserCanReview = async () => {
            const token = localStorage.getItem("token");
            const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
            const booking = bookings.find((b) => b.tourId === tourId);
            const bookingId = booking ? booking.bookingId : null;

            if (!token || !bookingId) {
                setCanReview(false); // Không cần thông báo ngay, chỉ đánh dấu không thể đánh giá
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5000/api/reviews/${tourId}/check?bookingId=${bookingId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCanReview(response.data.canReview);
            } catch (error) {
                console.error("Lỗi kiểm tra điều kiện đánh giá:", error.response?.data || error.message);
                setCanReview(false); // Nếu lỗi, mặc định không cho đánh giá
            }
        };

        checkUserCanReview();
    }, [tourId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(""); // Xóa thông báo lỗi cũ

        const token = localStorage.getItem("token");
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        const booking = bookings.find((b) => b.tourId === tourId);
        const bookingId = booking ? booking.bookingId : null;

        // Kiểm tra điều kiện trước khi gửi
        if (!token) {
            setErrorMessage("Bạn cần đăng nhập để đánh giá!");
            setLoading(false);
            return;
        }
        if (!bookingId) {
            setErrorMessage("Bạn chỉ có thể đánh giá sau khi đặt tour!");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:5000/api/reviews/${tourId}/check?bookingId=${bookingId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.data.canReview) {
                setErrorMessage(response.data.message);
                setLoading(false);
                return;
            }

            // Nếu đủ điều kiện, gửi đánh giá
            const submitResponse = await axios.post(
                `http://localhost:5000/api/reviews/${tourId}`,
                { rating, reviewText, bookingId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (submitResponse.data.error) {
                setErrorMessage(submitResponse.data.error);
            } else {
                onReviewAdded(submitResponse.data.review);
                setRating(0);
                setReviewText("");
                setErrorMessage("");
                setCanReview(false); // Không cho đánh giá tiếp sau khi gửi
            }
        } catch (error) {
            console.error("Lỗi từ server:", error.response?.data || error.message);
            setErrorMessage(error.response?.data?.error || "Lỗi khi gửi đánh giá, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-5 review-section">
            <h2 className="text-primary fw-bold mb-4">Đánh giá về tour</h2>
            <div className="card shadow-sm p-4 mb-4 review-form-card">
                <h5 className="mb-3">Thêm đánh giá của bạn</h5>
                {errorMessage && <p className="text-danger mb-3">{errorMessage}</p>}
                <form onSubmit={handleReviewSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Đánh giá:</label>
                        <div>{renderStars(rating, setRating, true)}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nhận xét:</label>
                        <textarea
                            className="form-control"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                            rows="3"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Đang gửi..." : "Gửi đánh giá"}
                    </button>
                </form>
            </div>
            {reviews.length === 0 ? (
                <p className="text-muted text-center">
                    {noReviewsMessage || "Chưa có đánh giá nào."}
                </p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="card shadow-sm p-3 mb-3 review-card">
                        <p className="mb-2">
                            <FaUser className="me-2 text-muted" />
                            <strong>{review.userId.fullName}</strong>
                        </p>
                        <div className="mb-2">{renderStars(review.rating)}</div>
                        <p>{review.reviewText}</p>
                    </div>
                ))
            )}
        </section>
    );
};

export default Reviews;