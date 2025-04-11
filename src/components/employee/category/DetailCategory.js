import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd"; // Import message từ antd

const DetailCategory = ({ id, onBack }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
      setCategory(response.data.data);
    } catch (err) {
      message.error("Lỗi khi lấy chi tiết danh mục!"); // Sử dụng message
    }
  };

  if (!category) return <div className="text-center">Đang tải...</div>;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Chi tiết Danh mục</h5>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Tên danh mục <span className="text-danger">*</span></label>
              <p>{category.categoryName}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Mô tả</label>
              <p>{category.description || "Không có mô tả"}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày tạo</label>
              <p>{new Date(category.createdAt).toLocaleString()}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày cập nhật</label>
              <p>{new Date(category.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onBack}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCategory;