import React from "react";
import { Link } from "react-router-dom";
import "../../styles/TourList.css";

// Hàm chuyển đổi định dạng ngày từ ISO sang DD/MM/YYYY
const formatDate = (dateString) => {
    if (!dateString) return 
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày, thêm 0 nếu cần
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (bắt đầu từ 0 nên +1)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const TourList = ({ tours = [], searchResults = [] }) => {
    const displayedTours = Array.isArray(searchResults) && searchResults.length > 0 ? searchResults : tours;

    return (
        <div className="tour-list-section">
            <h2 className="tour-list-title">Danh Sách Tour</h2>

            {displayedTours.length === 0 ? (
                <p className="tour-list-empty">Không tìm thấy tour nào.</p>
            ) : (
                <div className="tour-list">
                    {displayedTours.map((tour) => (
                        <div key={tour._id} className="tour-card">
                            <Link to={`/tour/${tour._id}`} className="tour-img-link">
                                <div className="tour-img-container">
                                    <img
                                        src={`http://localhost:5000/uploads/${tour.img}`}
                                        alt={tour.tourName}
                                        className="tour-img"
                                    />
                                    <div className="tour-img-overlay">
                                        <h3 className="tour-name">{tour.tourName}</h3>
                                    </div>
                                </div>
                            </Link>
                            <div className="tour-content">
                                <div className="tour-info">
                                    <p className="tour-price">
                                        {tour.price ? `${tour.price.toLocaleString()} VNĐ` : "Liên hệ"}
                                    </p>
                                    <p className="tour-duration">
                                        {formatDate(tour.startDate)} {/* Sử dụng hàm formatDate */}
                                    </p>
                                </div>
                                <p className="tour-description">
                                    {tour.description ? tour.description.substring(0, 100) + "..." : "Không có mô tả."}
                                </p>
                                <Link to={`/tour/${tour._id}`} className="tour-btn">Đặt Ngay</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TourList;