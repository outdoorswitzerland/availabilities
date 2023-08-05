import React from "react";
import ClientComponent from "../components/clientComponent.js";

export const metadata = {
  title: "Jetboat",
};

export default function Page() {
  const activityId = "305721";

  return (
    <div className="m-10">
      <ClientComponent
        activityId={activityId}
        title="JETBOAT departure times"
        jetboat
      />
    </div>
  );
}
