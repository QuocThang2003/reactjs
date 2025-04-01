import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const AddTour = ({ isOpen, onClose, refreshTours }) => {
    const [file, setFile] = useState(null);
    const [form] = Form.useForm();

    const handleAddTour = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            Object.keys(values).forEach(key => formData.append(key, values[key]));
            if (file) formData.append("img", file);
    
            const token = localStorage.getItem("token"); // Lấy token từ localStorage
    
            await axios.post("http://localhost:5000/api/tours", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}` // Gửi token trong header
                }
            });
    
            message.success("Thêm tour thành công");
            form.resetFields();  // Reset form
            setFile(null);  // Xóa file đã chọn
            onClose();  // Đóng modal
            refreshTours();  // Load lại danh sách
        } catch (error) {
            message.error("Lỗi khi thêm tour");
        }
    };

    // Hàm kiểm tra ngày bắt đầu và ngày kết thúc
    const validateDateRange = (_, value) => {
        const startDate = form.getFieldValue("startDate");
        const endDate = form.getFieldValue("endDate");
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            return Promise.reject(new Error("Ngày bắt đầu không được lớn hơn ngày kết thúc"));
        }
        return Promise.resolve();
    };

    // Hàm kiểm tra số lượng
    const validateQuantity = (_, value) => {
        if (value < 1) {
            return Promise.reject(new Error("Số lượng phải lớn hơn hoặc bằng 1"));
        }
        return Promise.resolve();
    };

    // Hàm kiểm tra giá
    const validatePrice = (_, value) => {
        if (value <= 0) {
            return Promise.reject(new Error("Giá phải là số dương"));
        }
        return Promise.resolve();
    };

    return (
        <Modal
            title="Thêm Tour"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>Hủy</Button>,
                <Button key="submit" type="primary" onClick={handleAddTour}>Thêm</Button>
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item 
                    name="tourName" 
                    label="Tên Tour" 
                    rules={[{ required: true, message: "Vui lòng nhập tên tour" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="description" 
                    label="Mô tả" 
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item 
                    name="price" 
                    label="Giá" 
                    rules={[
                        { required: true, message: "Vui lòng nhập giá" },
                        { validator: validatePrice }
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item 
                    name="quantity" 
                    label="Số lượng" 
                    rules={[
                        { required: true, message: "Vui lòng nhập số lượng" },
                        { validator: validateQuantity }
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item 
                    name="startDate" 
                    label="Ngày bắt đầu" 
                    rules={[
                        { required: true, message: "Vui lòng chọn ngày bắt đầu" },
                        { validator: validateDateRange }
                    ]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item 
                    name="endDate" 
                    label="Ngày kết thúc" 
                    rules={[
                        { required: true, message: "Vui lòng chọn ngày kết thúc" },
                        { validator: validateDateRange }
                    ]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item name="img" label="Hình ảnh">
                    <Upload
                        fileList={file ? [file] : []}
                        beforeUpload={(file) => { 
                            setFile(file);
                            return false;
                        }}
                        onRemove={() => setFile(null)}
                    >
                        <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTour;