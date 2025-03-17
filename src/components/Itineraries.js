import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Đảm bảo Bootstrap được import

const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
};

const Itineraries = ({ itineraries, noItinerariesMessage }) => {
    return (
        <div className="container mt-5">
            <h4 className="text-primary text-center mb-4">Lịch trình của tour</h4>
            {itineraries.length === 0 ? (
                <p className="text-muted text-center">{noItinerariesMessage || "Chưa có lịch trình nào cho tour này."}</p>
            ) : (
                <div className="row">
                    {itineraries.map((itinerary) => (
                        <div key={itinerary._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm h-100">
                                {itinerary.image && (
                                    <img 
                                        src={`http://localhost:5000${itinerary.image}`} 
                                        alt={itinerary.activity} 
                                        className="card-img-top img-fluid"
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{itinerary.activity}</h5>
                                    <p className="card-text"><strong>Ngày:</strong> {formatDate(itinerary.dateTime)}</p>
                                    <p className="card-text"><strong>Thời gian:</strong> {itinerary.startTime} - {itinerary.endTime}</p>
                                    <p className="card-text">{itinerary.details}</p>
                                    <div className="mt-auto"> {/* Đảm bảo rằng các phần tử bên trong card-body không bị đẩy ra ngoài */}
                                        {/* Có thể thêm các nút hoặc thông tin bổ sung tại đây */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Itineraries;
