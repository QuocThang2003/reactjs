import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Modal, Badge } from "antd";
import {
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
  PhoneOutlined,
  LeftOutlined,
  RightOutlined,
  FileDoneOutlined,
  BarChartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "../../styles/EmployeeDashboard.css";
import io from "socket.io-client";
import ChatAdmin from "./ChatAdmin";

const socket = io("http://localhost:5000", { withCredentials: true, autoConnect: false });

const AdminSidebar = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [messages, setMessages] = useState({});

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
  };

  useEffect(() => {
    setIsChatOpen(false);
  }, [location]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || role !== "admin") {
      console.log("Không tìm thấy token hoặc role không hợp lệ.");
      return;
    }

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("authenticate", token);

    socket.on("connect", () => {
      socket.emit("setRole", "admin");
      socket.emit("getOnlineUsers");
    });

    socket.on("error", (data) => {
      console.error("Lỗi xác thực:", data.message);
    });

    socket.on("messageFromUser", (data) => {
      const newMessage = {
        sender: "user",
        userId: data.userId,
        fullName: data.fullName,
        message: `${data.fullName}: ${data.message} (${data.timestamp})`,
      };
      setMessages((prev) => {
        const updatedMessages = { ...prev };
        if (!updatedMessages[data.userId]) updatedMessages[data.userId] = [];
        updatedMessages[data.userId].push(newMessage);
        return updatedMessages;
      });
      if (!isChatOpen) setHasNewMessage(true);
    });

    return () => {
      socket.off("connect");
      socket.off("error");
      socket.off("messageFromUser");
    };
  }, [isChatOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    socket.disconnect();
    navigate("/login/admin");
  };

  const openChat = () => {
    setIsChatOpen(true);
    setHasNewMessage(false);
    socket.emit("getOnlineUsers");
  };

  const closeChat = () => {
    setIsChatOpen(false);
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
            icon: <BarChartOutlined />,
            label: <Link to="/admin/barchart">Doanh thu</Link>,
            className: "menu-item",
          },
          {
            key: "6",
            icon: (
              <Badge dot={hasNewMessage}>
                <MessageOutlined />
              </Badge>
            ),
            label: "Chat với Khách",
            onClick: openChat,
            className: "menu-item",
          },
          {
            key: "7",
            icon: <LogoutOutlined />,
            label: "Đăng xuất",
            onClick: handleLogout,
            className: "menu-item",
          },
        ]}
      />
      <Modal
        title="Chat với Khách"
        open={isChatOpen}
        onCancel={closeChat}
        footer={null}
        width={600}
      >
        <ChatAdmin
          socket={socket}
          onClose={closeChat}
          initialMessages={messages}
          updateMessages={updateMessages}
        />
      </Modal>
    </div>
  );
};

export default AdminSidebar;