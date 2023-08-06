import React from "react";
import { DateProvider } from "../context/dateContext";
import HeaderBar from "../components/headerBar/headerBar";
import Availabilities from "../components/availabilities/availabilities";

export const metadata = {
  title: "Jetboat",
};

export default function Page() {
  return (
    <DateProvider>
      <div className="m-10">
        <HeaderBar title="JETBOAT departure times" jetboat />
        <Availabilities activityId="305721" />
      </div>
    </DateProvider>
  );
}
