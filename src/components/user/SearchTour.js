import React from "react";
import axios from "axios";


const SearchTour = ({ searchTerm, setSearchTerm, setTours, allTours }) => {
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setTours(allTours); // Nếu không nhập gì, hiển thị lại toàn bộ tour
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/tours/search`, {
                params: { tourName: searchTerm }
            });
            setTours(response.data || []); // Cập nhật danh sách tour theo từ khóa tìm kiếm
        } catch (error) {
            console.error("❌ Lỗi khi tìm kiếm tour:", error);
        }
    };

    return (
        <div className="search-tour-container text-center my-5">
            <div className="input-group search-bar mx-auto w-75">
                <input
                    type="text"
                    className="form-control form-control-lg search-input"
                    placeholder="Tìm kiếm tour theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm khi người dùng gõ
                    aria-label="Tìm kiếm tour"
                />
                <button 
                    onClick={handleSearch} 
                    className="btn btn-primary btn-lg ms-2 search-btn"
                >
                    Tìm kiếm
                </button>
            </div>
            <p className="text-muted mt-3">Nhập tên tour để tìm kiếm. Ví dụ: "Hà Nội", "Đà Lạt", ...</p>
        </div>
    );
};


export default SearchTour;
