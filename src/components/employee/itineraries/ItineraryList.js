import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import axios from "axios";
import AddItinerary from "./AddItinerary";
import EditItinerary from "./EditItinerary";
import DetailItinerary from "./DetailItinerary"; 
import DeleteItinerary from "./DeleteItinerary"; 
import EmployeeDashboard from "../EmployeeDashboard";
import "../../../styles/EmployeeDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ItineraryList = () => {
    const [itineraries, setItineraries] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false); // State cho Xem chi tiết
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // State cho Xóa
    const [selectedItinerary, setSelectedItinerary] = useState(null);

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/itineraries");
            setItineraries(res.data);
        } catch (error) {
            message.error("Lỗi khi tải danh sách lịch trình!");
        }
    };

    const columns = [
        { title: "Tour", dataIndex: ["tourId", "tourName"], key: "tourName" },
        { title: "Hoạt động", dataIndex: "activity", key: "activity" },
        { title: "Chi tiết", dataIndex: "details", key: "details" },
        { title: "Bắt đầu", dataIndex: "startTime", key: "startTime" },
        { title: "Kết thúc", dataIndex: "endTime", key: "endTime" },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            render: (img) => img ? <img src={`http://localhost:5000${img}`} alt="Itinerary" width={50} className="rounded" /> : "Không có"
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <div className="d-flex gap-2">
                    <Button type="primary" onClick={() => { setSelectedItinerary(record); setIsEditOpen(true); }}>
                        Sửa
                    </Button>
                    <Button type="default" onClick={() => { setSelectedItinerary(record); setIsViewOpen(true); }}>
                        Chi tiết
                    </Button>
                    <Popconfirm title="Xóa lịch trình?" onConfirm={() => { setSelectedItinerary(record); setIsDeleteOpen(true); }}>
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <div className="dashboard-container">
            <EmployeeDashboard />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Quản lý Lịch Trình</h2>
                    <Button type="primary" onClick={() => setIsAddOpen(true)}>
                        + Thêm Lịch Trình
                    </Button>
                </div>
                <Table dataSource={itineraries} columns={columns} rowKey="_id" bordered />
                <AddItinerary isOpen={isAddOpen} setIsOpen={setIsAddOpen} refresh={fetchItineraries} />
                <EditItinerary isOpen={isEditOpen} setIsOpen={setIsEditOpen} itinerary={selectedItinerary} refresh={fetchItineraries} />
                <DetailItinerary isOpen={isViewOpen} setIsOpen={setIsViewOpen} itinerary={selectedItinerary} />
                <DeleteItinerary isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} itinerary={selectedItinerary} refresh={fetchItineraries} />
            </div>
        </div>
    );
};

export default ItineraryList;