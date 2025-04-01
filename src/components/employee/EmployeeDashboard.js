import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, LogoutOutlined, UnorderedListOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../../styles/EmployeeDashboard.css";

const EmployeeSidebar = ({ collapsed, toggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login/admin");
    };

    return (
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                {!collapsed && <h3 className="sidebar-title">Employee Dashboard</h3>}
                <button onClick={toggleSidebar} className="toggle-btn">
                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </button>
            </div>
            <Menu mode="inline" theme="dark" defaultSelectedKeys={["1"]} className="sidebar-menu">
                <Menu.Item key="1" icon={<HomeOutlined />} className="menu-item">
                    <Link to="/employee/tours">Quản lý Đặt Tour</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UnorderedListOutlined />} className="menu-item">
                    <Link to="/employee/itineraries">Quản lý Lịch Trình</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout} className="menu-item">
                    Đăng xuất
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default EmployeeSidebar;