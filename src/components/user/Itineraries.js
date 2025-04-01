import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString("vi-VN") : "";

const Itineraries = ({ itineraries, noItinerariesMessage }) => {
    return (
        <section className="mt-5 itinerary-section">
            <h2 className="text-primary fw-bold mb-4">Lịch trình của tour</h2>
            {itineraries.length === 0 ? (
                <p className="text-muted text-center">
                    {noItinerariesMessage || "Chưa có lịch trình nào cho tour này."}
                </p>
            ) : (
                <div className="row g-4">
                    {itineraries.map((itinerary) => (
                        <div key={itinerary._id} className="col-md-4">
                            <div className="card shadow-sm h-100 itinerary-card">
                                {itinerary.image && (
                                    <img
                                        src={`http://localhost:5000${itinerary.image}`}
                                        alt={itinerary.activity}
                                        className="card-img-top"
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{itinerary.activity}</h5>
                                    <p className="card-text">
                                        <strong>Ngày:</strong> {formatDate(itinerary.dateTime)}
                                    </p>
                                    <p className="card-text">
                                        <strong>Thời gian:</strong> {itinerary.startTime} -{" "}
                                        {itinerary.endTime}
                                    </p>
                                    <p className="card-text">{itinerary.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Itineraries;