import { AvailableDates } from "@/components/availableDates";

export const metadata = {
  title: "Jetboat",
};

export default function Page() {
  return (
    <div className="m-10">
      <AvailableDates activity="jetboat" />
    </div>
  );
}
