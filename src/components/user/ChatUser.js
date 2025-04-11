import React, { useEffect, useState } from "react";

const ChatUser = ({ socket, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy token từ localStorage
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("Không tìm thấy token, yêu cầu đăng nhập.");
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    // Gửi token để xác thực với server Socket.IO
    console.log("Gửi token để xác thực:", token);
    socket.emit("authenticate", token);

    // Kiểm tra trạng thái kết nối ngay lập tức
    if (socket.connected) {
      console.log("Socket đã kết nối, đặt vai trò là user.");
      socket.emit("setRole", "user");
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      // Nếu socket chưa kết nối, chờ sự kiện connect
      socket.on("connect", () => {
        console.log("Socket vừa kết nối, đặt vai trò là user.");
        socket.emit("setRole", "user");
        setIsAuthenticated(true);
        setLoading(false);
      });
    }

    // Lắng nghe lỗi xác thực từ server
    socket.on("error", (data) => {
      console.error("Lỗi xác thực:", data.message);
      setIsAuthenticated(false);
      setLoading(false);
    });

    // Lắng nghe tin nhắn từ chính người dùng
    socket.on("messageFromUser", (data) => {
      console.log("Nhận tin nhắn từ chính user:", data);
      setMessages((prev) => [...prev, `Bạn: ${data.message} (${data.timestamp})`]);
    });

    // Lắng nghe tin nhắn từ admin
    socket.on("messageFromAdmin", (data) => {
      console.log("Nhận tin nhắn từ admin:", data);
      setMessages((prev) => [...prev, `Admin: ${data.message} (${data.timestamp})`]);
    });

    // Dọn dẹp các listener khi component unmount
    return () => {
      socket.off("connect");
      socket.off("error");
      socket.off("messageFromUser");
      socket.off("messageFromAdmin");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!isAuthenticated) {
      alert("Vui lòng đăng nhập để gửi tin nhắn!");
      return;
    }
    if (messageInput) {
      console.log("Gửi tin nhắn:", messageInput);
      socket.emit("sendMessageToAdmin", { message: messageInput });
      setMessageInput("");
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <h3>Chat với Admin</h3>
          <button onClick={onClose} className="chat-close-btn">
            X
          </button>
        </div>
        <div className="chat-messages">
          <p>Vui lòng đăng nhập để sử dụng tính năng chat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat với Admin</h3>
        <button onClick={onClose} className="chat-close-btn">
          X
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default ChatUser;