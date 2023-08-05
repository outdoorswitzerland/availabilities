import React from "react";
import ClientComponent from "../components/clientComponent.js";

export const metadata = {
  title: "Canyon Swing: Interlaken",
};

export default function Page() {
  return (
    <div className="m-10">
      <ClientComponent
        activityId="87"
        title="CANYON SWING"
        subTitle="(w/transport from Interlaken)"
        priceCategory="Single Seat with Transport"
      />
    </div>
  );
}
