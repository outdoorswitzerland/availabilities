import { AvailableDates } from "@/components/availableDates";
import { Suspense } from "react";

export const metadata = {
  title: "Canyon Swing: Grindelwald",
};

export default function Page() {
  return (
    <div className="m-10">
      <Suspense fallback={<div>Loading...</div>}>
        <AvailableDates activity="canyonSwingGrindelwald" />
      </Suspense>
    </div>
  );
}
