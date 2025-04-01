import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { LogoutOutlined, TeamOutlined, UserOutlined, PhoneOutlined, LeftOutlined, RightOutlined, FileDoneOutlined, BarChartOutlined } from "@ant-design/icons";
import "../../styles/EmployeeDashboard.css";

const AdminSidebar = ({ collapsed, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login/admin");
    };

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                {!collapsed && <h3 className="sidebar-title">Admin Dashboard</h3>}
                <button onClick={toggleSidebar} className="toggle-btn">
                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </button>
            </div>
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={["1"]}
                className="sidebar-menu"
                items={[
                    {
                        key: "1",
                        icon: <TeamOutlined />,
                        label: <Link to="/admin/employees">Quản lý Nhân Viên</Link>,
                        className: "menu-item",
                    },
                    {
                        key: "2",
                        icon: <UserOutlined />,
                        label: <Link to="/admin/users">Quản lý Người Dùng</Link>,
                        className: "menu-item",
                    },
                    {
                        key: "3",
                        icon: <PhoneOutlined />,
                        label: <Link to="/admin/contact">Quản lý Liên Hệ</Link>,
                        className: "menu-item",
                    },
                    {
                        key: "4",
                        icon: <FileDoneOutlined />,
                        label: <Link to="/admin/booking">Quản lý Đặt Tour</Link>,
                        className: "menu-item",
                    },
                    {
                        key: "5",
                        icon: <BarChartOutlined />, // Icon biểu đồ cột
                        label: <Link to="/admin/barchart">Doanh thu</Link>,
                        className: "menu-item",
                    },
                    {
                        key: "6",
                        icon: <LogoutOutlined />,
                        label: "Đăng xuất",
                        onClick: handleLogout,
                        className: "menu-item",
                    },
                ]}
            />
        </div>
    );
};

export default AdminSidebar;