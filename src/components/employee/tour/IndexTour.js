import React, { useEffect, useState } from "react";
import { Table, Button, Input, message } from "antd";
import axios from "axios";
import AddTour from "./AddTour";
import EditTour from "./EditTour";
import DeleteTour from "./DeleteTour";
import TourDetail from "./TourDetail";
import EmployeeDashboard from "../EmployeeDashboard";
import "../../../styles/EmployeeDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const IndexTour = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTourId, setSelectedTourId] = useState(null);
    const [editingTour, setEditingTour] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTours, setTotalTours] = useState(0);
    const pageSize = 5;

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? "" : date.toLocaleDateString("vi-VN");
    };

    useEffect(() => {
        fetchTours(currentPage);
    }, [currentPage]);

    const fetchTours = async (page) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/tours?page=${page}&limit=${pageSize}`);
            setTours(res.data.tours || res.data);
            setTotalTours(res.data.total || res.data.length);
        } catch (error) {
            message.error("Lỗi khi tải danh sách tour");
        }
        setLoading(false);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/tours/search?tourName=${search}&page=${currentPage}&limit=${pageSize}`);
            setTours(res.data.tours || res.data);
            setTotalTours(res.data.total || res.data.length);
        } catch (error) {
            message.error("Lỗi khi tìm kiếm");
        }
        setLoading(false);
    };

    const openEditModal = (tour) => {
        setEditingTour(tour);
        setIsEditModalOpen(true);
    };

    const openDetailModal = (tourId) => {
        setSelectedTourId(tourId);
        setIsDetailModalOpen(true);
    };

    const columns = [
        { title: "Tên Tour", dataIndex: "tourName", key: "tourName" },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text) => (
                <div
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "300px",
                    }}
                >
                    {text}
                </div>
            ),
        },
        { title: "Giá", dataIndex: "price", key: "price" },
        { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            key: "startDate",
            render: formatDate,
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            key: "endDate",
            render: formatDate,
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "categoryName",
            render: (category) => category?.categoryName || "Không có danh mục",
        },
        {
            title: "Hình ảnh",
            dataIndex: "img",
            key: "img",
            render: (img) =>
                img && (
                    <img
                        src={`http://localhost:5000/uploads/${img}`}
                        alt="Tour"
                        style={{
                            width: "100px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <div className="btn-group gap-2">
                    <Button type="primary" onClick={() => openEditModal(record)}>
                        Sửa
                    </Button>
                    <Button type="default" onClick={() => openDetailModal(record._id)}>
                        Xem Chi Tiết
                    </Button>
                    <DeleteTour tourId={record._id} fetchTours={() => fetchTours(currentPage)} />
                </div>
            ),
        },
    ];

    const paginationConfig = {
        current: currentPage,
        pageSize: pageSize,
        total: totalTours,
        onChange: (page) => setCurrentPage(page),
        showSizeChanger: false,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} tour`,
    };

    return (
        <div className="dashboard-container">
            <EmployeeDashboard collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Quản lý Đặt Tour</h2>
                    <div className="d-flex gap-2">
                        <Input.Search
                            placeholder="Nhập tên tour..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onSearch={handleSearch}
                            className="form-control"
                            style={{ width: 300 }}
                        />
                        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
                            + Thêm Tour
                        </Button>
                    </div>
                </div>
                <Table
                    dataSource={tours}
                    rowKey="_id"
                    loading={loading}
                    columns={columns}
                    bordered
                    pagination={paginationConfig}
                />

                <AddTour
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    refreshTours={() => fetchTours(currentPage)}
                />
                <EditTour
                    isOpen={isEditModalOpen}
                    setIsOpen={setIsEditModalOpen}
                    tour={editingTour}
                    refreshTours={() => fetchTours(currentPage)}
                />
                {isDetailModalOpen && (
                    <TourDetail
                        tourId={selectedTourId}
                        onClose={() => setIsDetailModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default IndexTour;