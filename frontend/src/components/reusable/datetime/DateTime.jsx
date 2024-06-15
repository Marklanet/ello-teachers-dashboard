import React, { useState, useEffect } from "react";
import "./datetime.css";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  return (
    <div className="date-time-display">
      <div className="date light-text-gradient">
        {formatDate(currentDateTime)}
      </div>
      <div className="time">{formatTime(currentDateTime)}</div>
    </div>
  );
};

export default DateTime;
