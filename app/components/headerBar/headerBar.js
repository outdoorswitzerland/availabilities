"use client";

import DatePicker from "../datePicker/datePicker";

export const HeaderBar = ({ title, jetboat, setSelectedDate, subTitle }) => {
  return (
    <div
      className={`grid grid-cols-2 items-center ${
        jetboat ? "bg-oRed" : "bg-primary"
      } text-white text-2xl rounded-md p-4 mb-4`}
    >
      <div>
        <div>{title}</div>
        <div className="text-lg">{subTitle}</div>
      </div>
      <DatePicker setSelectedDate={setSelectedDate} />
    </div>
  );
};
