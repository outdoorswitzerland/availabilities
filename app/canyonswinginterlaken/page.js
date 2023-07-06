import { fetchAvailability, refreshAccessToken } from "../api/route.js";
import { HeaderBar } from "../components/headerBar/headerBar.js";
import { Availabilities } from "../components/availabilities/availabilities.js";

export const metadata = {
  title: "Canyon Swing from Interlaken",
};

// fetch availability data
const activityId = "87";
const tokenData = await refreshAccessToken();
const token = tokenData?.access_token;
const availabilitiesData = await fetchAvailability(activityId, token);

export default async function Page() {
  return (
    <div className="m-10">
      <HeaderBar
        title="CANYON SWING"
        subTitle="(w/transport from Interlaken)"
      />
      <Availabilities
        data={availabilitiesData}
        titleMatch="Single Seat with Transport"
      />
    </div>
  );
}

// Single Seat - Meeting Point Glacier Canyon
