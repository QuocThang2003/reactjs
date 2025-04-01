import React, { useEffect, useState } from "react";
import axios from "axios";

// CSS inline để cải thiện giao diện
const styles = {
    modalContent: {
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        backgroundColor: "#f9f9f9",
    },
    modalHeader: {
        borderBottom: "none",
        paddingBottom: "0",
    },
    modalTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#2c3e50",
        textAlign: "center",
    },
    modalBody: {
        padding: "20px 0",
    },
    infoRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "5px",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.05)",
    },
    label: {
        fontWeight: "bold",
        color: "#34495e",
        width: "30%",
    },
    value: {
        color: "#7f8c8d",
        width: "70%",
        wordBreak: "break-word",
    },
    image: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
        marginTop: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    modalFooter: {
        borderTop: "none",
        display: "flex",
        justifyContent: "center",
        paddingTop: "0",
    },
    closeButton: {
        backgroundColor: "#3498db",
        border: "none",
        borderRadius: "5px",
        padding: "10px 20px",
        color: "#fff",
        fontWeight: "bold",
        transition: "background-color 0.3s",
    },
    closeButtonHover: {
        backgroundColor: "#2980b9",
    },
};

const TourDetail = ({ tourId, onClose }) => {
    const [tour, setTour] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:5000/api/tours/${tourId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTour(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Lỗi khi lấy thông tin tour.");
            }
        };

        if (tourId) {
            fetchTour();
        }
    }, [tourId]);

    if (!tour) return <p className="text-center text-muted">{error || "Đang tải..."}</p>;

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "" : date.toLocaleDateString("vi-VN");
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content" style={styles.modalContent}>
                    <div className="modal-header" style={styles.modalHeader}>
                        <h5 className="modal-title" style={styles.modalTitle}>Chi Tiết Tour</h5>
                    </div>
                    <div className="modal-body" style={styles.modalBody}>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Tên Tour:</span>
                            <span style={styles.value}>{tour.tourName}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Mô tả:</span>
                            <span style={styles.value}>{tour.description}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Giá:</span>
                            <span style={styles.value}>{tour.price.toLocaleString()} VNĐ</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Số lượng:</span>
                            <span style={styles.value}>{tour.quantity}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Ngày bắt đầu:</span>
                            <span style={styles.value}>{formatDate(tour.startDate)}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Ngày kết thúc:</span>
                            <span style={styles.value}>{formatDate(tour.endDate)}</span>
                        </div>
                        {tour.img && (
                            <div style={styles.infoRow}>
                                <span style={styles.label}>Hình ảnh:</span>
                                <div style={{ width: "70%" }}>
                                    <img
                                        src={`http://localhost:5000/uploads/${tour.img}`}
                                        alt="Tour"
                                        style={styles.image}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer" style={styles.modalFooter}>
                        <button
                            type="button"
                            className="btn"
                            style={styles.closeButton}
                            onMouseOver={(e) => (e.target.style.backgroundColor = styles.closeButtonHover.backgroundColor)}
                            onMouseOut={(e) => (e.target.style.backgroundColor = styles.closeButton.backgroundColor)}
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetail;