"use client";

import { useState, useEffect } from "react";

export const HeaderBar = ({ subTitle, title }) => {
  const [todaysDate, setTodaysDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { month: "short", day: "numeric" };
      const formattedDate = now.toLocaleDateString("en-US", options);
      setTodaysDate(formattedDate);
    };

    updateDate();
    const intervalId = setInterval(updateDate, 60000); // Update the date every minute
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 bg-primary text-white text-2xl rounded-md p-4 mb-4">
      <div>
        <div>{title}</div>
        <div className="text-lg">{subTitle}</div>
      </div>
      <div className="text-right">{todaysDate}</div>
    </div>
  );
};
