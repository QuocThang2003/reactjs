import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../AdminSidebar"; // Import sidebar admin

const IndexUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // Lấy token từ LocalStorage
                if (!token) {
                    setError("Bạn chưa đăng nhập!");
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/users", {
                    headers: {
                        Authorization: `Bearer ${token}` // Gửi token trong header
                    }
                });

                setUsers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Không thể tải danh sách người dùng.");
            }
        };

        fetchUsers();
    }, []);

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
                        <h2 className="text-center mb-4 text-primary">Danh Sách Người Dùng</h2>
                        {error && <p className="text-danger text-center">{error}</p>}
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và Tên</th>
                                        <th>Email</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Địa Chỉ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user._id}>
                                                <td>{index + 1}</td>
                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.address || "N/A"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center text-muted">
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
        </div>
    );
};

export default IndexUser;
