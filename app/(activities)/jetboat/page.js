import { AvailableDates } from "@/components/availableDates";
import { Suspense } from "react";

export const metadata = {
  title: "Jetboat",
};

export default function Page() {
  return (
    <div className="m-10">
      <Suspense fallback={<div>Loading...</div>}>
        <AvailableDates activity="jetboat" />
      </Suspense>
    </div>
  );
}
