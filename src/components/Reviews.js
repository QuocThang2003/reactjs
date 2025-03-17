// src/components/Reviews.js
import React from "react";
import { FaUser, FaStar } from "react-icons/fa";

const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <FaStar key={i} className={i <= rating ? "text-warning" : "text-muted"} />
        );
    }
    return stars;
};

const Reviews = ({ reviews, noReviewsMessage }) => {
    return (
        <div className="mt-5">
            <h4 className="text-primary">Đánh giá về tour</h4>
            {reviews.length === 0 ? (
                <p className="text-muted">{noReviewsMessage || "Chưa có đánh giá nào."}</p>
            ) : (
                reviews.map((review) => (
                    <div key={review._id} className="border p-3 mb-3 rounded shadow-sm">
                        <p><FaUser className="me-2" /> <strong>{review.userId.fullName}</strong></p>
                        <p>{renderStars(review.rating)}</p>
                        <p>{review.reviewText}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Reviews;
