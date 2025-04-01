import React from "react";
import { Modal, Button, message } from "antd";
import axios from "axios";

const DeleteItinerary = ({ isOpen, setIsOpen, itinerary, refresh }) => {
    const handleDelete = async () => {
        try {
            // Lấy token từ localStorage (hoặc nơi bạn lưu trữ token)
            const token = localStorage.getItem("token"); // Giả sử token được lưu ở đây

            if (!token) {
                message.error("Không tìm thấy token, vui lòng đăng nhập lại!");
                return;
            }

            // Gửi yêu cầu DELETE với token trong header Authorization
            await axios.delete(`http://localhost:5000/api/itineraries/${itinerary._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            message.success("Xóa thành công!");
            refresh(); // Làm mới danh sách
            setIsOpen(false);
        } catch (error) {
            // Xử lý lỗi từ server (ví dụ: token hết hạn, không có quyền, v.v.)
            if (error.response?.status === 401) {
                message.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
            } else {
                message.error("Lỗi khi xóa lịch trình!");
            }
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <Modal
            title="Xác nhận Xóa Lịch Trình"
            visible={isOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="delete" type="primary" danger onClick={handleDelete}>
                    Xóa
                </Button>,
            ]}
        >
            <p>Bạn có chắc chắn muốn xóa lịch trình này?</p>
            {itinerary && (
                <p>
                    <strong>Tour:</strong> {itinerary.tourId?.tourName || "Không có"} -{" "}
                    <strong>Hoạt động:</strong> {itinerary.activity}
                </p>
            )}
        </Modal>
    );
};

export default DeleteItinerary;