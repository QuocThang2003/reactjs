import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, message, DatePicker, TimePicker, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const AddItinerary = ({ isOpen, setIsOpen, refresh }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [tours, setTours] = useState([]);

    // Lấy danh sách tour từ API
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/tours");
                setTours(res.data); 
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tour:", error);
            }
        };
        fetchTours();
    }, []);

    const handleUpload = ({ file }) => setFile(file);

    const handleAdd = async () => {
        try {
            const values = await form.validateFields();
            console.log("Dữ liệu gửi:", values);
    
            const formData = new FormData();
            formData.append("tourId", values.tourId);
            formData.append("dateTime", values.dateTime);
            formData.append("details", values.details);
            formData.append("activity", values.activity);
            formData.append("startTime", values.startTime.format("HH:mm"));
            formData.append("endTime", values.endTime.format("HH:mm"));
            if (file) formData.append("image", file);
    
            const token = sessionStorage.getItem("token"); 
    
            await axios.post("http://localhost:5000/api/itineraries", formData, {
                headers: { Authorization: `Bearer ${token}` }, 
            });
    
            message.success("Thêm lịch trình thành công!");
            setIsOpen(false);
            refresh();
            form.resetFields();
        } catch (error) {
            console.error("Lỗi khi thêm lịch trình:", error);
            message.error("Lỗi khi thêm lịch trình!");
        }
    };
    
    return (
        <Modal 
            title="Thêm Lịch Trình" 
            open={isOpen} 
            onCancel={() => setIsOpen(false)} 
            onOk={handleAdd}
        >
            <Form form={form} layout="vertical">
                {/* Chọn tour */}
                <Form.Item name="tourId" label="Tour" rules={[{ required: true, message: "Chọn tour!" }]}>
                    <Select placeholder="Chọn tour">
                        {tours.map((tour) => (
                            <Option key={tour._id} value={tour._id}>
                                {tour.tourName} {/* Hiển thị tên tour đúng */}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="activity" label="Hoạt động" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="details" label="Chi tiết" rules={[{ required: true }]}><Input.TextArea /></Form.Item>
                <Form.Item name="dateTime" label="Ngày" rules={[{ required: true }]}><DatePicker /></Form.Item>
                <Form.Item name="startTime" label="Bắt đầu" rules={[{ required: true }]}><TimePicker format="HH:mm" /></Form.Item>
                <Form.Item name="endTime" label="Kết thúc" rules={[{ required: true }]}><TimePicker format="HH:mm" /></Form.Item>

                {/* Upload ảnh */}
                <Form.Item label="Hình ảnh">
                    <Upload beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddItinerary;
