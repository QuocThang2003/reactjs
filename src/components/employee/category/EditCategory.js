import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd"; // Import message từ antd

const EditCategory = ({ isOpen, setIsOpen, category, refreshCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setCategoryName(category.categoryName);
      setDescription(category.description || "");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/categories/${category._id}`,
        { categoryName, description },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      message.success("Cập nhật danh mục thành công!"); // Sử dụng message
      refreshCategories();
      setIsOpen(false);
    } catch (err) {
      message.error(err.response?.data?.message || "Lỗi khi cập nhật danh mục!"); // Sử dụng message
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sửa Danh mục</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Tên danh mục <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Mô tả
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Đóng
              </button>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;