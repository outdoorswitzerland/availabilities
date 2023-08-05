"use client";

import React, { useEffect, useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick }, ref) => {
  const [month, day] = value.split(" ");

  return (
    <button
      className="flex flex-nowrap items-center"
      onClick={onClick}
      ref={ref}
    >
      <div className="flex whitespace-nowrap">
        <div className="text-base uppercase rotate-90 mr-2">{month}</div>
        <div className="text-5xl">{day}</div>
      </div>
      <div className="h-8 ml-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="fill-current text-white w-full h-full"
        >
          <path d="M26 4h-4V3c0-.6-.4-1-1-1s-1 .4-1 1v1h-8V3c0-.6-.4-1-1-1s-1 .4-1 1v1H6c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 22H6V12h20v14zm0-16H6V6h4v1c0 .6.4 1 1 1s1-.4 1-1V6h8v1c0 .6.4 1 1 1s1-.4 1-1V6h4v4z"></path>
        </svg>
      </div>
    </button>
  );
});

export default function CustomDatePicker({ setSelectedDate }) {
  const [localSelectedDate, setLocalSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  useEffect(() => {
    console.log("Selected date in DatePicker:", localSelectedDate);
    setSelectedDate(localSelectedDate);
  }, [localSelectedDate, setSelectedDate]);

  const dateObject = new Date(localSelectedDate);

  return (
    <div className="text-right">
      <DatePicker
        selected={dateObject}
        onChange={(date) =>
          setLocalSelectedDate(date.toISOString().split("T")[0])
        }
        dateFormat="MMM dd"
        customInput={<CustomInput />}
      />
    </div>
  );
}
