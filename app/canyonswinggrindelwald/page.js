import React from "react";
import { DateProvider } from "../context/dateContext";
import HeaderBar from "../components/headerBar/headerBar";
import Availabilities from "../components/availabilities/availabilities";

export const metadata = {
  title: "Canyon Swing: Grindelwald",
};

export default function Page() {
  return (
    <DateProvider>
      <div className="m-10">
        <HeaderBar
          title="CANYON SWING"
          subTitle="(meet @ the Glacier Canyon)"
        />
        <Availabilities
          activityId="87"
          priceCategory="Single Seat - Meeting Point Glacier Canyon"
        />
      </div>
    </DateProvider>
  );
}
