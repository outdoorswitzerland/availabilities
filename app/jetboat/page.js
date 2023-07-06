import { fetchAvailabilityWithRefreshedToken } from "../api/route.js";
import { HeaderBar } from "../components/headerBar/headerBar.js";
import { Availabilities } from "../components/availabilities/availabilities.js";

export const metadata = {
  title: "Canyon Swing from Interlaken",
};

// fetch availability data
const activityId = "305721";
const availabilitiesData = await fetchAvailabilityWithRefreshedToken(
  activityId
);

export default async function Page() {
  return (
    <div className="m-10">
      <HeaderBar title="JETBOAT departure times" />
      <Availabilities data={availabilitiesData} />
    </div>
  );
}
