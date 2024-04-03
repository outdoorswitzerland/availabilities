"use client";

import CustomDatePicker from "../datePicker/datePicker";
import { useDateStore } from "@/store/dateStore";

const HeaderBar = ({ activity, date }) => {
  const { selectedDate, setSelectedDate } = useDateStore();

  const bgColor = activity === "jetboat" ? "bg-oRed" : "bg-primary";

  const activityTitle = {
    jetboat: "JETBOAT",
    canyonSwingInterlaken: "CANYON SWING",
    canyonSwingGrindelwald: "CANYON SWING",
  };
  const activitySubTitle = {
    jetboat: `Departure times | Abfahrtszeiten | Horaires de départ | 出発時刻 |
    أوقات مغادرة`,
    canyonSwingInterlaken: "(w/transport from Interlaken)",
    canyonSwingGrindelwald: "(meet @ the Glacier Canyon)",
  };

  return (
    <div
      className={`grid grid-cols-12 items-center ${bgColor} text-white text-xl rounded-lg p-4 mb-4`}
    >
      <div className="col-span-10">
        <div className="text-3xl font-bold tracking-wider">
          {activityTitle[activity]}
        </div>
        <div className="text-lg">{activitySubTitle[activity]}</div>
      </div>
      <div className="col-span-2">
        <CustomDatePicker setSelectedDate={setSelectedDate} date={date} />
      </div>
    </div>
  );
};

export default HeaderBar;
