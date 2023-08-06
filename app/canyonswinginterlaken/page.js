import React from "react";
import { DateProvider } from "../context/dateContext";
import HeaderBar from "../components/headerBar/headerBar";
import Availabilities from "../components/availabilities/availabilities";

export const metadata = {
  title: "Canyon Swing: Interlaken",
};

export default function Page() {
  return (
    <DateProvider>
      <div className="m-10">
        <HeaderBar
          title="CANYON SWING"
          subTitle="(w/transport from Interlaken)"
        />
        <Availabilities
          activityId="87"
          priceCategory="Single Seat with Transport"
        />
      </div>
    </DateProvider>
  );
}
