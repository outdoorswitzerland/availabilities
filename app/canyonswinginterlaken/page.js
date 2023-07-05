// format date for api request parameter
const now = new Date();
const year = now.getFullYear();
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const day = ("0" + now.getDate()).slice(-2);
const formattedDate = year + "-" + month + "-" + day;

// format date for heading display
const options = { month: "short", day: "numeric" };
const todaysDate = now.toLocaleDateString("en-US", options);

// api details
const trekksoftApiBaseUrl = "https://api2.trekksoft.com";

// refresh access token (expires every 60 minutes)
const urlToken = `${trekksoftApiBaseUrl}/oauth2/token`;
const grantType = "client_credentials";
const clientId = "a882c2775e9ec35753e6e4b002da4643";
const clientSecret = "888e9e440978f0a4656c28ee3b7134784217db8ed4578ff2";

// fetch new access token
async function getAccessToken() {
  const res = await fetch(urlToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}`,
    next: { revalidate: 60 * 55 }, // refresh every 55 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const accessToken = await getAccessToken();

// fetch availability data
const currentToken = accessToken?.access_token;
const activityId = "87"; // canyon swing
// const apiParams = `?activeOnly=false&startsFrom=${formattedDate}&startsTo=${formattedDate}`;
const apiParams = `?activeOnly=false&startsFrom=2023-07-06&startsTo=2023-07-06`;
const url = `${trekksoftApiBaseUrl}/activities/${activityId}/availabilities${apiParams}`;
const headers = {
  Authorization: `Bearer ${currentToken}`,
};

async function getAvailability() {
  const res = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const availabilitiesData = await getAvailability();

// display availabilities
const availabilities = availabilitiesData
  ?.reduce((acc, d) => {
    const { categories, startTime, availabilityItemId } = d;
    const startTimeString = startTime;

    const date = new Date();
    const dateString = `${date.toISOString().split("T")[0]}T${startTimeString}`;
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Europe/Zurich",
    });
    const formattedTime = formatter.format(new Date(dateString));

    // Check if the current item has a unique availabilityItemId
    if (
      !acc.some((item) => item.availabilityItemId === availabilityItemId)
      // && new Date(dateString) > date // Check if formattedTime is in the future
    ) {
      acc.push({
        availabilityItemId,
        formattedTime,
        availableSeats: categories[0].availableSeats,
      });
    }

    return acc;
  }, [])
  .map((item) => (
    <div
      key={item.availabilityItemId}
      className="grid grid-cols-2 gap-4 mb-4 p-4 text-2xl rounded-md shadow border border-gray-200"
    >
      <div>{item.formattedTime}</div>
      <div className="text-right">
        <strong>{item.availableSeats}</strong> seats available
      </div>
    </div>
  ));

export default async function Page() {
  return (
    <div className="m-10">
      <div className="grid grid-cols-2 bg-primary text-white text-2xl rounded-md p-4 mb-4">
        <div>CANYON SWING (w/transport)</div>
        <div className="text-right">{todaysDate}</div>
      </div>
      {availabilities}
      {/* <pre>{JSON.stringify(accessToken.access_token, null, 4)}</pre> */}
    </div>
  );
}
