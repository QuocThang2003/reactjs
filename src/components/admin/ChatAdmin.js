import React, { useEffect, useState } from "react";

const ChatAdmin = ({ socket, onClose, initialMessages = {}, updateMessages }) => {
  const [messageInput, setMessageInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Lắng nghe danh sách người dùng trực tuyến
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Lắng nghe tin nhắn từ user
    socket.on("messageFromUser", (data) => {
      const newMessage = {
        sender: "user",
        userId: data.userId,
        fullName: data.fullName,
        message: `${data.fullName}: ${data.message} (${data.timestamp})`,
      };
      updateMessages((prev) => {
        const updatedMessages = { ...prev };
        if (!updatedMessages[data.userId]) updatedMessages[data.userId] = [];
        updatedMessages[data.userId].push(newMessage);
        return updatedMessages;
      });
    });

    // Lắng nghe xác nhận tin nhắn từ admin (chỉ reset input)
    socket.on("messageSentConfirmation", (data) => {
      const newMessage = {
        sender: "admin",
        userId: data.userId,
        message: `Bạn: ${data.message} (${data.timestamp})`,
      };
      updateMessages((prev) => {
        const updatedMessages = { ...prev };
        if (!updatedMessages[data.userId]) updatedMessages[data.userId] = [];
        updatedMessages[data.userId].push(newMessage);
        return updatedMessages;
      });
      setMessageInput(""); // Xóa input sau khi gửi
    });

    socket.on("error", (data) => {
      alert(data.message);
    });

    socket.emit("getOnlineUsers");

    return () => {
      socket.off("onlineUsers");
      socket.off("messageFromUser");
      socket.off("messageSentConfirmation");
      socket.off("error");
    };
  }, [socket, updateMessages]);

  const sendMessage = () => {
    if (messageInput.trim() && selectedUserId) {
      socket.emit("sendMessageToUser", {
        message: messageInput.trim(),
        userId: selectedUserId,
      });
    } else {
      alert("Vui lòng chọn khách và nhập tin nhắn hợp lệ!");
    }
  };

  const filteredMessages = selectedUserId ? initialMessages[selectedUserId] || [] : [];

  return (
    <div className="chat-container">
      <div className="user-list">
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="user-select"
        >
          <option value="">Chọn khách để chat</option>
          {onlineUsers.map(([userId, fullName]) => (
            <option key={userId} value={userId}>{fullName}</option>
          ))}
        </select>
      </div>
      <div className="chat-messages">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg, index) => (
            <div key={`${msg.userId}-${msg.timestamp}-${index}`}>
              {msg.message}
            </div>
          ))
        ) : (
          <div>{selectedUserId ? "Chưa có tin nhắn." : "Vui lòng chọn khách để xem tin nhắn."}</div>
        )}
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

export default ChatAdmin;