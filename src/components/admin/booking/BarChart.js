import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import AdminSidebar from "../AdminSidebar"; // Điều chỉnh đường dẫn nếu cần
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState(""); // Thêm state để xử lý lỗi
    const year = 2025; // Cố định năm 2025
    const [collapsed, setCollapsed] = useState(false); // State cho sidebar

    // Hàm toggle sidebar
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    // Gọi API để lấy dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Bạn chưa đăng nhập!");
                    return;
                }

                const response = await axios.get(
                    `http://localhost:5000/api/bookings/monthly-total?year=${year}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Thêm token để xác thực
                        },
                    }
                );
                const monthlyTotals = response.data.monthlyTotals;

                // Dữ liệu cho biểu đồ cột
                const data = {
                    labels: [
                        "Th1", "Th2", "Th3", "Th4", "Th5", "Th6",
                        "Th7", "Th8", "Th9", "Th10", "Th11", "Th12",
                    ],
                    datasets: [
                        {
                            label: "Doanh thu (VND)",
                            data: monthlyTotals,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                };

                setChartData(data);
            } catch (error) {
                setError(error.response?.data?.error || "Không thể tải dữ liệu doanh thu.");
                console.error("Lỗi khi lấy dữ liệu từ API:", error);
            }
        };

        fetchData();
    }, []);

    // Cấu hình tùy chọn cho biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Doanh thu theo tháng trong năm ${year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Doanh thu (VND)",
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Tháng",
                },
            },
        },
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar Admin */}
                <div className="col-md-3 bg-light vh-100 p-3">
                    <AdminSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
                </div>

                {/* Nội dung chính */}
                <div className="col-md-9 mt-4">
                    <div className="card shadow-sm rounded p-4">
                        <h2 className="text-center mb-4 text-primary">Biểu đồ doanh thu năm 2025</h2>
                        {error && <p className="text-danger text-center">{error}</p>}
                        {chartData ? (
                            <Bar data={chartData} options={options} />
                        ) : (
                            <p className="text-center">Đang tải dữ liệu...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarChart;