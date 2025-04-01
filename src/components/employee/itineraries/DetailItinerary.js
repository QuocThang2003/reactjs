import React, { useState, useEffect } from "react";
import { Modal, Button, message, Spin, Row, Col } from "antd";
import axios from "axios";

const DetailItinerary = ({ isOpen, setIsOpen, itinerary }) => {
    const [itineraryDetails, setItineraryDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && itinerary?._id) {
            fetchItineraryDetails(itinerary._id);
        }
    }, [isOpen, itinerary]);

    const fetchItineraryDetails = async (id) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/itineraries/${id}`);
            setItineraryDetails(res.data);
        } catch (error) {
            message.error("Lỗi khi tải chi tiết lịch trình!");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        setItineraryDetails(null); // Reset dữ liệu khi đóng modal
    };

    return (
        <Modal
            title="Chi tiết Lịch Trình"
            visible={isOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="close" onClick={handleCancel}>
                    Đóng
                </Button>
            ]}
            width={600} // Tăng chiều rộng modal để bố cục rõ ràng hơn
        >
            {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin tip="Đang tải..." />
                </div>
            ) : (
                itineraryDetails && (
                    <div style={{ padding: "10px 0" }}>
                        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                            <Col span={24}>
                                <strong style={{ fontSize: "16px" }}>Tour:</strong>
                                <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                                    {itineraryDetails.tourId?.tourName || "Không có"}
                                </p>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                            <Col span={24}>
                                <strong style={{ fontSize: "16px" }}>Hoạt động:</strong>
                                <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                                    {itineraryDetails.activity || "Không có"}
                                </p>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                            <Col span={24}>
                                <strong style={{ fontSize: "16px" }}>Chi tiết:</strong>
                                <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                                    {itineraryDetails.details || "Không có"}
                                </p>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                            <Col span={12}>
                                <strong style={{ fontSize: "16px" }}>Bắt đầu:</strong>
                                <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                                    {itineraryDetails.startTime || "Không có"}
                                </p>
                            </Col>
                            <Col span={12}>
                                <strong style={{ fontSize: "16px" }}>Kết thúc:</strong>
                                <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                                    {itineraryDetails.endTime || "Không có"}
                                </p>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                            <Col span={24}>
                                <strong style={{ fontSize: "16px" }}>Hình ảnh:</strong>
                                <div style={{ marginTop: "5px" }}>
                                    {itineraryDetails.image ? (
                                        <img
                                            src={`http://localhost:5000${itineraryDetails.image}`}
                                            alt="Itinerary"
                                            style={{ width: "100%", maxWidth: "200px", borderRadius: "8px" }}
                                        />
                                    ) : (
                                        <p style={{ fontSize: "14px" }}>Không có</p>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </div>
                )
            )}
        </Modal>
    );
};

export default DetailItinerary;