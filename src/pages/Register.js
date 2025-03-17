import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName, phone, email, password, confirmPassword,
      });
      console.log("Phản hồi từ server:", response);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      if (error.response) {
        alert("Lỗi đăng ký: " + (error.response.data?.message || "Lỗi từ server không rõ"));
      } else {
        alert("Lỗi đăng ký: Không kết nối được tới server");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient"
         style={{ background: "linear-gradient(to bottom, #4b0082, #0000ff)" }}>
      <div className="bg-white p-4 rounded shadow-lg w-25">
        <h2 className="text-center text-primary">Đăng Ký</h2>
        <div className="mx-auto my-2" style={{ width: "50px", height: "3px", backgroundColor: "#4b0082" }}></div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Họ và tên</label>
            <div className="input-group">
              <span className="input-group-text">👤</span>
              <input type="text" className="form-control" placeholder="Họ và tên"
                     value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <div className="input-group">
              <span className="input-group-text">📞</span>
              <input type="text" className="form-control" placeholder="Số điện thoại"
                     value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">📧</span>
              <input type="email" className="form-control" placeholder="Email"
                     value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <div className="input-group">
              <span className="input-group-text">🔒</span>
              <input type="password" className="form-control" placeholder="Mật khẩu"
                     value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Xác nhận mật khẩu</label>
            <div className="input-group">
              <span className="input-group-text">🔐</span>
              <input type="password" className="form-control" placeholder="Xác nhận mật khẩu"
                     value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Đăng ký</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/login")}>Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
