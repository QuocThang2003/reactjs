import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchTour = ({ setTours, allTours }) => {
    const [searchTerm, setSearchTerm] = useState(""); // State cho tìm kiếm theo tên
    const [selectedCategory, setSelectedCategory] = useState(""); // State cho danh mục được chọn
    const [categories, setCategories] = useState([]); // Khởi tạo là mảng rỗng

    // Lấy danh sách danh mục từ backend khi component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/categories");
                const categoryData = res.data.data || res.data; // Điều chỉnh theo cấu trúc API
                console.log("Dữ liệu danh mục từ API:", categoryData); // Debug
                if (Array.isArray(categoryData)) {
                    setCategories(categoryData);
                } else {
                    console.error("Dữ liệu danh mục không phải là mảng:", categoryData);
                    setCategories([]);
                }
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách danh mục:", error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    // Xử lý tìm kiếm và lọc khi nhấn nút "Tìm kiếm"
    const handleSearch = async () => {
        // Nếu không có từ khóa và không chọn danh mục, hiển thị tất cả tour
        if (!searchTerm.trim() && !selectedCategory) {
            console.log("Không có từ khóa hoặc danh mục, hiển thị tất cả tour");
            setTours(allTours);
            return;
        }

        try {
            // Nếu có chọn danh mục, ưu tiên lọc theo danh mục
            if (selectedCategory) {
                const response = await axios.get(`http://localhost:5000/api/tours/category/${selectedCategory}`);
                console.log(`Kết quả lọc theo danh mục ${selectedCategory}:`, response.data); // Debug
                setTours(response.data || []);
            } 
            // Nếu chỉ có từ khóa tìm kiếm, lọc theo tên
            else if (searchTerm.trim()) {
                const response = await axios.get(`http://localhost:5000/api/tours/search`, {
                    params: { tourName: searchTerm }
                });
                console.log("Kết quả tìm kiếm theo tên:", response.data); // Debug
                setTours(response.data || []);
            }
        } catch (error) {
            console.error("❌ Lỗi khi tìm kiếm/lọc tour:", error);
        }
    };

    // Xử lý khi thay đổi input
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Xử lý khi thay đổi danh mục (chỉ cập nhật state, không lọc ngay)
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        console.log("Danh mục được chọn:", categoryId); // Debug
    };

    return (
        <div className="search-tour-container text-center my-5">
            <div className="input-group search-bar mx-auto w-75">
                <input
                    type="text"
                    className="form-control form-control-lg search-input"
                    placeholder="Tìm kiếm tour theo tên..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    aria-label="Tìm kiếm tour"
                />
                <select
                    className="form-select form-select-lg ms-2"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    aria-label="Chọn danh mục"
                >
                    <option value="">Tất cả danh mục</option>
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.categoryName}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có danh mục</option>
                    )}
                </select>
                <button
                    onClick={handleSearch}
                    className="btn btn-primary btn-lg ms-2 search-btn"
                >
                    Tìm kiếm
                </button>
            </div>
            <p className="text-muted mt-3">
                Nhập tên tour hoặc chọn danh mục, sau đó nhấn Tìm kiếm. Ví dụ: "Hà Nội", "Quốc Tế", ...
            </p>
        </div>
    );
};

export default SearchTour;