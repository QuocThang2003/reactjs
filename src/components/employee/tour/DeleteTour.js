import axios from "axios";
import { message, Button, Modal } from "antd";
import { useState } from "react";

const DeleteTour = ({ tourId, onTourDeleted }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const handleDelete = async () => {
         // Ghi log ID tour
        setLoading(true);
       
        const token = sessionStorage.getItem("token"); // Lấy token từ localStorage
        
        if (!token) {
            message.error("Bạn không có quyền thực hiện hành động này");
            setLoading(false);
            return;
        }
        
        try {
            
            await axios.delete(`http://localhost:5000/api/tours/${tourId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            });
            message.success("Xóa tour thành công");
            onTourDeleted();
            setIsModalOpen(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                message.error("Bạn không có quyền xóa tour này");
            } else {
                message.error("Lỗi khi xóa tour");
            }
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