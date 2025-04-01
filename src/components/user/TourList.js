import React from "react";
import { Link } from "react-router-dom";
import "../../styles/TourList.css";

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
                                        {tour.duration || "N/A"} ngày
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