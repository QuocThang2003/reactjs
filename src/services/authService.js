import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
};

export const registerUser = (fullName, phone, email, password, confirmPassword) => {
    return axios.post(`${API_URL}/register`, { fullName, phone, email, password, confirmPassword });
};

export const logoutUser = () => {
    return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
