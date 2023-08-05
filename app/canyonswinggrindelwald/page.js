import React from "react";
import ClientComponent from "../components/clientComponent.js";

export const metadata = {
  title: "Canyon Swing: Grindelwald",
};

export default function Page() {
  return (
    <div className="m-10">
      <ClientComponent
        activityId="87"
        title="CANYON SWING"
        subTitle="(meet @ the Glacier Canyon)"
        priceCategory="Single Seat - Meeting Point Glacier Canyon"
      />
    </div>
  );
}
