import axios from "axios";
import { message, Button, Modal } from "antd";
import { useState } from "react";

const DeleteTour = ({ tourId, onTourDeleted }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:5000/api/tours/${tourId}`);
            message.success("Xóa tour thành công");
            onTourDeleted();
            setIsModalOpen(false);
        } catch (error) {
            message.error("Lỗi khi xóa tour");
        }
        setLoading(false);
    };

    return (
        <>
            <Button danger onClick={() => setIsModalOpen(true)}>Xóa</Button>
            <Modal
                title="Xác nhận xóa"
                open={isModalOpen}
                onOk={handleDelete}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={loading}
            >
                <p>Bạn có chắc chắn muốn xóa tour này?</p>
            </Modal>
        </>
    );
};

export default DeleteTour;