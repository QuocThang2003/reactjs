import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const GoogleAuthHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
    
        console.log("Token trong Login.js:", token); // Debug token
    
        if (token) {
            sessionStorage.setItem("token", token);
            const decodedToken = jwtDecode(token);
            sessionStorage.setItem("user", JSON.stringify({
                id: decodedToken.id,
                fullName: decodedToken.fullName
            }));
            navigate("/"); // Điều hướng về trang chủ sau khi lưu token
        }
    }, [navigate]); // Thêm navigate vào dependency
    

    return null;
};

export default GoogleAuthHandler;
