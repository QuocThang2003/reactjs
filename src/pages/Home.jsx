import React, { useState, useEffect } from "react";
import "../styles/home.css";
import TourList from "../components/user/TourList";
import CountdownTimer from "../components/CountdownTimer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import SearchTour from "../components/user/SearchTour";

const Home = () => {
    const targetDate = "2025-04-30T00:00:00";

    const [searchTerm, setSearchTerm] = useState("");
    const [allTours, setAllTours] = useState([]);
    const [tours, setTours] = useState([]);

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

    return (
        <div className="home">
            <Header />

            {/* Banner */}
            <div className="home-banner">
                <img
                    src="/banner.jpg"
                    alt="Tour Banner"
                    className="home-banner-img"
                />
                <div className="home-banner-overlay">
                    <h1 className="home-banner-title">Khám Phá Thế Giới Cùng TravelApp</h1>
                    <p className="home-banner-subtitle">Những hành trình đáng nhớ đang chờ bạn!</p>
                </div>
            </div>

            {/* Tìm kiếm Tour */}
            <div className="home-search-section">
                <SearchTour
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setTours={setTours}
                    allTours={allTours}
                />
            </div>

            {/* Giới thiệu */}
            <div className="home-intro-section">
                <h2 className="home-section-title">Khám phá những hành trình đáng nhớ!</h2>
                <p className="home-section-subtitle">
                    Chúng tôi mang đến cho bạn những tour du lịch hấp dẫn nhất với giá cả hợp lý.
                </p>
                <div className="home-countdown">
                    <CountdownTimer targetDate={targetDate} />
                </div>
            </div>

            {/* Danh sách Tour */}
            <div className="home-tours-section">
                <h2 className="home-section-title">Các Tour Nổi Bật</h2>
                <TourList tours={tours} />
            </div>

            <Footer />
        </div>
    );
};

export default Home;