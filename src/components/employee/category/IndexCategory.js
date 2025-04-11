import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DetailCategory from "./DetailCategory";
import EmployeeDashboard from "../EmployeeDashboard";
import "../../../styles/EmployeeDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const IndexCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data.data || res.data);
    } catch (error) {
      message.error("Lỗi khi tải danh sách danh mục");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setCategories(categories.filter((category) => category._id !== id));
        message.success("Xóa danh mục thành công!");
      } catch (err) {
        message.error(err.response?.data?.message || "Lỗi khi xóa danh mục!");
      }
    }
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  };

  const openDetailModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsDetailModalOpen(true);
  };

  const columns = [
    { title: "Tên Danh mục", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "300px",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div className="btn-group gap-2">
          <Button type="primary" onClick={() => openEditModal(record)}>
            Sửa
          </Button>
          <Button type="default" onClick={() => openDetailModal(record._id)}>
            Xem Chi Tiết
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <EmployeeDashboard collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Quản lý Danh mục</h2>
          <div className="d-flex gap-2">
            <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
              + Thêm Danh mục
            </Button>
          </div>
        </div>
        <Table
          dataSource={categories}
          rowKey="_id"
          loading={loading}
          columns={columns}
          bordered
        />

        <AddCategory
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          refreshCategories={fetchCategories}
        />
        <EditCategory
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          category={editingCategory}
          refreshCategories={fetchCategories}
        />
        {isDetailModalOpen && (
          <DetailCategory
            id={selectedCategoryId}
            onBack={() => setIsDetailModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default IndexCategory;