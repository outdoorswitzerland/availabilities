import { AvailableDates } from "@/components/availableDates";

export const metadata = {
  title: "Canyon Swing: Interlaken",
};

export default function Page() {
  return (
    <div className="m-10">
      <AvailableDates activity="canyonSwingInterlaken" />
    </div>
  );
}
