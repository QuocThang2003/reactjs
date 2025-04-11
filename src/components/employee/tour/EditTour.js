import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const EditTour = ({ isOpen, setIsOpen, tour, refreshTours }) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]); // Khởi tạo là mảng rỗng

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categories");
                // Kiểm tra cấu trúc dữ liệu trả về
                const categoryData = res.data.data || res.data; // Điều chỉnh theo cấu trúc API
                if (Array.isArray(categoryData)) {
                    setCategories(categoryData);
                } else {
                    console.error("Dữ liệu danh mục không phải là mảng:", categoryData);
                    setCategories([]);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách danh mục:", error);
                message.error("Lỗi khi tải danh sách danh mục");
                setCategories([]);
            }
        };

        if (isOpen) {
            fetchCategories();
        }

        if (tour && isOpen) {
            form.setFieldsValue({
                ...tour,
                startDate: tour.startDate ? new Date(tour.startDate).toISOString().split("T")[0] : "",
                endDate: tour.endDate ? new Date(tour.endDate).toISOString().split("T")[0] : "",
                category: tour.category?._id || tour.category, // Gán category ID
            });
        }
    }, [tour, form, isOpen]);

    const handleEditTour = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
                if (key === "startDate" || key === "endDate") {
                    values[key] = values[key] ? new Date(values[key]).toISOString() : "";
                }
                formData.append(key, values[key]);
            });

            if (file) {
                formData.append("img", file);
            }

            const token =sessionStorage.getItem("token");

            await axios.put(`http://localhost:5000/api/tours/${tour._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            message.success("Cập nhật tour thành công");
            setIsOpen(false);
            refreshTours();
        } catch (error) {
            message.error("Lỗi khi chỉnh sửa tour");
            console.error("Chi tiết lỗi:", error.response?.data || error.message);
        }
    };

    const validateDateRange = (_, value) => {
        const startDate = form.getFieldValue("startDate");
        const endDate = form.getFieldValue("endDate");
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            return Promise.reject(new Error("Ngày bắt đầu không được lớn hơn ngày kết thúc"));
        }
        return Promise.resolve();
    };

    const validateQuantity = (_, value) => {
        if (value < 1) {
            return Promise.reject(new Error("Số lượng phải lớn hơn hoặc bằng 1"));
        }
        return Promise.resolve();
    };

    const validatePrice = (_, value) => {
        if (value <= 0) {
            return Promise.reject(new Error("Giá phải là số dương"));
        }
        return Promise.resolve();
    };

    return (
        <Modal
            title="Chỉnh sửa Tour"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={handleEditTour}
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
                        { validator: validatePrice },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Số lượng"
                    rules={[
                        { required: true, message: "Vui lòng nhập số lượng" },
                        { validator: validateQuantity },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="startDate"
                    label="Ngày bắt đầu"
                    rules={[
                        { required: true, message: "Vui lòng chọn ngày bắt đầu" },
                        { validator: validateDateRange },
                    ]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    name="endDate"
                    label="Ngày kết thúc"
                    rules={[
                        { required: true, message: "Vui lòng chọn ngày kết thúc" },
                        { validator: validateDateRange },
                    ]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Danh mục"
                    rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                >
                    <Select placeholder="Chọn danh mục" loading={!categories.length}>
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <Option key={cat._id} value={cat._id}>
                                    {cat.categoryName}
                                </Option>
                            ))
                        ) : (
                            <Option disabled>Không có danh mục</Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item label="Hình ảnh">
                    <Upload
                        beforeUpload={(file) => {
                            setFile(file);
                            return false;
                        }}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                    </Upload>
                    {tour?.img && !file && <p style={{ marginTop: 8 }}>Ảnh hiện tại: {tour.img}</p>}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTour;