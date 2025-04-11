import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset thông báo lỗi

    // Kiểm tra xem các trường có bị để trống không
    if (!fullName || !phone || !email || !password || !confirmPassword || !address) {
      setErrorMessage("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }

    // Kiểm tra điều khoản
    if (!termsAccepted) {
      setErrorMessage("Vui lòng chấp nhận điều khoản để tiếp tục.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        phone,
        email,
        password,
        confirmPassword,
        address,
      });
      console.log("Phản hồi từ server:", response);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Không kết nối được tới server. Vui lòng thử lại sau!");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="register-container">
        <div className="register-form">
          <button className="close-btn" onClick={() => navigate("/")}>×</button>
          <h2>· Đăng Ký Tài Khoản ·</h2>

          {/* Hiển thị thông báo lỗi */}
          {errorMessage && (
            <div className="error-message" style={{ color: "red", marginBottom: "15px" }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Họ và Tên</label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                // Bỏ thuộc tính required
              />
            </div>
            <div className="form-group">
              <label>Địa chỉ Email</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // Bỏ thuộc tính required
              />
            </div>
            <div className="form-group">
              <label>Số Điện Thoại</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                // Bỏ thuộc tính required
              />
            </div>
            <div className="form-group">
              <label>Địa Chỉ</label>
              <input
                type="text"
                placeholder="Nhập địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                // Bỏ thuộc tính required
              />
            </div>
            <div className="form-group">
              <label>Mật Khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Bỏ thuộc tính required
              />
            </div>
            <div className="form-group">
              <label>Xác Nhận Mật Khẩu</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                // Bỏ thuộc tính required
              />
            </div>
            <div className="form-group terms">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label>
                Tôi đồng ý với <b>điều khoản và chính sách</b> của chúng tôi.
              </label>
            </div>
            <button type="submit" className="btn-create-account">TẠO TÀI KHOẢN</button>
            <p className="signin-link">
              Bạn đã có tài khoản? <a onClick={() => navigate("/login")}>Đăng nhập</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;