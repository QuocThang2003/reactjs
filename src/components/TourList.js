import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TourList = ({ tours = [], searchResults = [] }) => {
    const displayedTours = Array.isArray(searchResults) && searchResults.length > 0 ? searchResults : tours;

    return (
        <div className="container py-5">
            <h2 className="text-center text-primary mb-4">Danh Sách Tour</h2>

            {displayedTours.length === 0 ? (
                <p className="text-center text-muted">Không tìm thấy tour nào.</p>
            ) : (
                <div className="row">
                    {displayedTours.map((tour) => (
                        <div key={tour._id} className="col-md-6 mb-4">
                            <div className="card shadow-lg border-0">
                                <Link to={`/tour/${tour._id}`} className="text-decoration-none">
                                    <img
                                        src={`http://localhost:5000/uploads/${tour.img}`}
                                        alt={tour.tourName}
                                        className="card-img-top img-fluid rounded-top"
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />
                                </Link>
                                <div className="card-body text-center">
                                    <h5 className="card-title text-dark">{tour.tourName}</h5>
                                    <p className="card-text text-muted">
                                        Giá: <strong className="text-danger">{tour.price} VNĐ</strong>
                                    </p>
                                    <Link to={`/tour/${tour._id}`} className="btn btn-primary w-100">
                                        Xem Chi Tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TourList;
