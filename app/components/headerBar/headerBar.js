"use client";

import CustomDatePicker from "../datePicker/datePicker";
import { useDateStore } from "@/store/dateStore";

const HeaderBar = ({ activity, date }) => {
  const { selectedDate, setSelectedDate } = useDateStore();

  const bgColor = activity === "jetboat" ? "bg-oRed" : "bg-primary";

  const activityTitle = {
    jetboat: "JETBOAT TRIPS",
    canyonSwingInterlaken: "CANYON SWING",
    canyonSwingGrindelwald: "CANYON SWING",
  };
  const activitySubTitle = {
    jetboat: `Departure times | Abfahrtszeiten | Horaires de départ | 出発時刻 |
    أوقات مغادرة`,
    canyonSwingInterlaken: "(w/transport from Interlaken)",
    canyonSwingGrindelwald: "(meet @ the Glacier Canyon)",
  };

  const isJetboat = activity === "jetboat";

  return (
    <div
      className={`grid grid-cols-12 items-start ${bgColor} text-white text-xl rounded-lg p-6 mb-8`}
    >
      <div className="col-span-11">
        <div className={`${isJetboat ? "text-8xl" : "text-3xl"} font-bold`}>
          {activityTitle[activity]}
        </div>
        <div className="text-2xl">{activitySubTitle[activity]}</div>
      </div>
      <div className="col-span-1">
        <CustomDatePicker setSelectedDate={setSelectedDate} date={date} />
      </div>
    </div>
  );
};

export default HeaderBar;
