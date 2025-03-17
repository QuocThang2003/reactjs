import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = Math.floor((new Date(targetDate) - now) / 1000);
        return difference > 0 ? difference : 0; // Nếu hết hạn thì trả về 0
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return (
            <div className="d-flex justify-content-center text-primary fw-bold">
                <div className="mx-2 text-center">
                    <h2>{days}</h2>
                    <p className="mb-0">Days</p>
                </div>
                <div className="mx-2 text-center">
                    <h2>{hours < 10 ? `0${hours}` : hours}</h2>
                    <p className="mb-0">Hour</p>
                </div>
                <div className="mx-2 text-center">
                    <h2>{minutes < 10 ? `0${minutes}` : minutes}</h2>
                    <p className="mb-0">Minute</p>
                </div>
                <div className="mx-2 text-center">
                    <h2>{secs < 10 ? `0${secs}` : secs}</h2>
                    <p className="mb-0">Second</p>
                </div>
            </div>
        );
    };

    return <>{formatTime(timeLeft)}</>;
};

export default CountdownTimer;
