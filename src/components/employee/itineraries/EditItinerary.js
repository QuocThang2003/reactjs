import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, message, DatePicker, TimePicker, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const EditItinerary = ({ isOpen, setIsOpen, refresh, itinerary }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [tours, setTours] = useState([]);

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

    useEffect(() => {
        if (itinerary) {
            form.setFieldsValue({
                tourId: itinerary.tourId,
                activity: itinerary.activity,
                details: itinerary.details,
                dateTime: itinerary.dateTime ? moment(itinerary.dateTime) : null,
                startTime: itinerary.startTime ? moment(itinerary.startTime, "HH:mm") : null,
                endTime: itinerary.endTime ? moment(itinerary.endTime, "HH:mm") : null,
            });
        }
    }, [itinerary, form]);

    const handleUpload = ({ file }) => setFile(file);

    const handleEdit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            formData.append("tourId", values.tourId);
            formData.append("dateTime", values.dateTime.toISOString());
            formData.append("details", values.details);
            formData.append("activity", values.activity);
            formData.append("startTime", values.startTime.format("HH:mm"));
            formData.append("endTime", values.endTime.format("HH:mm"));
            if (file) formData.append("image", file);
    
            const token = localStorage.getItem("token"); // Lấy token từ localStorage
    
            await axios.put(`http://localhost:5000/api/itineraries/${itinerary._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }, // Gửi token lên server
            });
    
            message.success("Cập nhật thành công!");
            setIsOpen(false);
            refresh();
        } catch (error) {
            console.error("Lỗi khi cập nhật lịch trình:", error);
            message.error("Lỗi khi cập nhật lịch trình!");
        }
    };
    

    return (
        <Modal title="Chỉnh Sửa Lịch Trình" open={isOpen} onCancel={() => setIsOpen(false)} onOk={handleEdit}>
            <Form form={form} layout="vertical">
                {/* Chọn tour */}
                <Form.Item name="tourId" label="Tour" rules={[{ required: true, message: "Chọn tour!" }]}>
                    <Select placeholder="Chọn tour">
                        {tours.map((tour) => (
                            <Option key={tour._id} value={tour._id}>
                                {tour.tourName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="activity" label="Hoạt động" rules={[{ required: true }]}><Input /></Form.Item>
                <Form.Item name="details" label="Chi tiết" rules={[{ required: true }]}><Input.TextArea /></Form.Item>
                <Form.Item name="dateTime" label="Ngày" rules={[{ required: true }]}><DatePicker format="YYYY-MM-DD" /></Form.Item>
                <Form.Item name="startTime" label="Bắt đầu" rules={[{ required: true }]}><TimePicker format="HH:mm" /></Form.Item>
                <Form.Item name="endTime" label="Kết thúc" rules={[{ required: true }]}><TimePicker format="HH:mm" /></Form.Item>
                <Form.Item label="Hình ảnh">
                    <Upload beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditItinerary;
