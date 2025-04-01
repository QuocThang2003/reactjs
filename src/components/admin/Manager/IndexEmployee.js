import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEmployee from "./AddEmployee";
import AdminSidebar from "../AdminSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const IndexEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/employees", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const toggleStatus = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/employees/toggle-status/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setEmployees(
                employees.map(emp =>
                    emp._id === id ? { ...emp, isActive: !emp.isActive } : emp
                )
            );
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    const deleteEmployee = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
            try {
                await axios.delete(`http://localhost:5000/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setEmployees(employees.filter(emp => emp._id !== id));
            } catch (error) {
                console.error("Lỗi khi xóa nhân viên:", error);
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 bg-light vh-100 p-3">
                    <AdminSidebar />
                </div>
                <div className="col-md-9 mt-4">
                    <div className="card shadow p-4">
                        {isAddingEmployee ? (
                            <AddEmployee />
                        ) : (
                            <>
                                <h2 className="text-center text-primary mb-4">Quản Lý Nhân Viên</h2>
                                <button
                                    className="btn btn-success mb-3"
                                    onClick={() => setIsAddingEmployee(true)}
                                >
                                    Thêm Nhân Viên
                                </button>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover text-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>Tên Đăng Nhập</th>
                                                <th>Vai Trò</th>
                                                <th>Trạng Thái</th>
                                                <th>Hành Động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employees.length > 0 ? (
                                                employees.map((employee, index) => (
                                                    <tr key={employee._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{employee.username}</td>
                                                        <td>{employee.role}</td>
                                                        <td>
                                                            <span
                                                                className={`badge bg-${employee.isActive ? "success" : "danger"}`}
                                                            >
                                                                {employee.isActive ? "Hoạt động" : "Khóa"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className={`btn btn-${employee.isActive ? "danger" : "success"} me-2`}
                                                                onClick={() => toggleStatus(employee._id)}
                                                            >
                                                                {employee.isActive ? "Khóa" : "Mở khóa"}
                                                            </button>
                                                            <button
                                                                className="btn btn-warning"
                                                                onClick={() => deleteEmployee(employee._id)}
                                                            >
                                                                Xóa
                                                            </button>
                                                        </td>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexEmployee;
