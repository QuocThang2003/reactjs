import React, { useState, useEffect } from "react";
import "../styles/home.css";

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = Math.floor((new Date(targetDate) - now) / 1000);
        return difference > 0 ? difference : 0;
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
            <div className="countdown-timer">
                <div className="countdown-item">
                    <div className="countdown-value">{days}</div>
                    <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-item">
                    <div className="countdown-value">{hours < 10 ? `0${hours}` : hours}</div>
                    <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-item">
                    <div className="countdown-value">{minutes < 10 ? `0${minutes}` : minutes}</div>
                    <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-item">
                    <div className="countdown-value">{secs < 10 ? `0${secs}` : secs}</div>
                    <div className="countdown-label">Seconds</div>
                </div>
            </div>
        );
    };

    return <>{formatTime(timeLeft)}</>;
};

export default CountdownTimer;