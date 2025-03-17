import React, { useState, useEffect } from "react";
import "../styles/home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TourList from "../components/TourList"; 
import CountdownTimer from "../components/CountdownTimer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Home = () => {
    const targetDate = "2025-04-01T00:00:00";

    const [searchTerm, setSearchTerm] = useState("");
    const [allTours, setAllTours] = useState([]); // Lưu tất cả tour ban đầu
    const [tours, setTours] = useState([]); // Lưu danh sách tour hiển thị

    // 🔹 Gọi API để lấy toàn bộ tour khi trang Home load lần đầu
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/tours");
                setAllTours(response.data || []);
                setTours(response.data || []);
            } catch (error) {
                console.error("❌ Lỗi khi lấy danh sách tour:", error);
            }
        };
        fetchTours();
    }, []);

    // 🔹 Xử lý tìm kiếm tour
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setTours(allTours); // Nếu không nhập gì, hiển thị lại toàn bộ tour
            return;
        }

        try {
            console.log("📢 Gửi request API với tourName:", searchTerm);
            const response = await axios.get(`http://localhost:5000/api/tours/search`, {
                params: { tourName: searchTerm }
            });

            console.log("✅ Dữ liệu nhận được:", response.data);
            setTours(response.data || []);
        } catch (error) {
            console.error("❌ Lỗi khi tìm kiếm tour:", error);
        }
    };

    return (
        <div>
            <Header />

            {/* Banner */}
            <div className="container-fluid p-0">
                <img 
                    src="/banner.jpg" 
                    alt="Tour Banner" 
                    className="img-fluid w-100"
                    style={{ height: "400px", objectFit: "cover" }} 
                />
            </div>

          {/* Tìm kiếm Tour */}
            <div className="container my-4">
                <div className="search-container">
                    <input 
                        type="text" 
                        className="search-box"
                        placeholder="🔍 Nhập tên tour..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button ms-2" onClick={handleSearch}>
                        Tìm kiếm
                    </button>
                </div>
            </div>

            {/* Giới thiệu */}
            <div className="container my-5 text-center">
                <h1 className="text-primary fw-bold">Khám phá những hành trình đáng nhớ!</h1>
                <p className="text-muted">Chúng tôi mang đến cho bạn những tour du lịch hấp dẫn nhất với giá cả hợp lý.</p>

                <div className="mt-3">
                    <CountdownTimer targetDate={targetDate} />
                </div>
            </div>

            {/* Danh sách Tour */}
            <div className="container">
                <TourList tours={tours} />  
            </div>

            <Footer />
        </div>
    );
};

export default Home;
