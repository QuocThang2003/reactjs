import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../AdminSidebar";
import { Modal, Button } from "react-bootstrap";

const IndexContact = () => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState("");
    const [selectedContact, setSelectedContact] = useState(null); // Chứa thông tin liên hệ được chọn
    const [showModal, setShowModal] = useState(false); // Kiểm soát hiển thị Modal

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    setError("Bạn chưa đăng nhập!");
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/contact/all", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setContacts(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Không thể tải danh sách liên hệ.");
            }
        };

        fetchContacts();
    }, []);

    // 📌 Lấy chi tiết liên hệ khi click
    const fetchContactById = async (id) => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get(`http://localhost:5000/api/contact/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSelectedContact(response.data);
            setShowModal(true); // Hiển thị Modal
        } catch (err) {
            setError(err.response?.data?.message || "Không thể tải chi tiết liên hệ.");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar Admin */}
                <div className="col-md-3 bg-light vh-100 p-3">
                    <AdminSidebar />
                </div>

                {/* Nội dung chính */}
                <div className="col-md-9 mt-4">
                    <div className="card shadow-sm rounded p-4">
                        <h2 className="text-center mb-4 text-primary">Danh Sách Liên Hệ</h2>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và Tên</th>
                                        <th>Email</th>
                                        <th>Điện Thoại</th>
                                        <th>Nội Dung</th>
                                        <th>Trạng thái</th>
                                        <th>Thời Gian</th>
                                        <th>Hành động</th>

                                    </tr>
                                </thead>
                                <tbody>
    {contacts.length > 0 ? (
        contacts.map((contact, index) => (
            <tr key={contact._id}>
                <td>{index + 1}</td>
                <td>{contact.fullName}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.message}</td>
                <td>
                    <span
                        className={`badge ${contact.status === "unread" ? "bg-danger" : "bg-success"}`}
                    >
                        {contact.status === "unread" ? "Chưa đọc" : "Đã đọc"}
                    </span>
                </td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
                <td>
                    <button
                        className="btn btn-sm btn-info"
                        onClick={() => fetchContactById(contact._id)}
                    >
                        Xem chi tiết
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="8" className="text-center text-muted">
                Không có dữ liệu
            </td>
        </tr>
    )}
</tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal hiển thị chi tiết liên hệ */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chi Tiết Liên Hệ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedContact ? (
                        <div>
                            <p><strong>Họ và Tên:</strong> {selectedContact.fullName}</p>
                            <p><strong>Email:</strong> {selectedContact.email}</p>
                            <p><strong>Điện Thoại:</strong> {selectedContact.phone}</p>
                            <p><strong>Nội Dung:</strong> {selectedContact.message}</p>
                            <p><strong>Thời Gian:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
                            <p><strong>Trạng Thái:</strong> {selectedContact.status === "read" ? "Đã đọc" : "Chưa đọc"}</p>
                        </div>
                    ) : (
                        <p>Đang tải...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default IndexContact;
