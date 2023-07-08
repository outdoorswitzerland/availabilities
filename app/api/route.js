// format date for api request parameter
const now = new Date();
const year = now.getFullYear();
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const day = ("0" + now.getDate()).slice(-2);
const formattedDate = year + "-" + month + "-" + day;

// api details
const trekksoftApiBaseUrl = "https://api2.trekksoft.com";

// refresh access token (expires every 60 minutes)
const urlToken = `${trekksoftApiBaseUrl}/oauth2/token`;
const grantType = "client_credentials";
const clientId = "a882c2775e9ec35753e6e4b002da4643";
const clientSecret = "888e9e440978f0a4656c28ee3b7134784217db8ed4578ff2";

// fetch new access token
export async function refreshAccessToken() {
  const res = await fetch(urlToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}`,
    next: { revalidate: 60 * 55 }, // Revalidate every 55 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// fetch availability data
export async function fetchAvailability(activityId, token) {
  const apiParams = `?activeOnly=false&startsFrom=${formattedDate}&startsTo=${formattedDate}`;
  //   const apiParams = `?activeOnly=false&startsFrom=2023-07-06&startsTo=2023-07-06`;
  const urlAvailabilities = `${trekksoftApiBaseUrl}/activities/${activityId}/availabilities${apiParams}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(urlAvailabilities, {
    method: "GET",
    headers: headers,
    next: { revalidate: 60 }, // refresh every 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchAvailabilityWithRefreshedToken(activityId) {
  const tokenData = await refreshAccessToken();
  const token = tokenData?.access_token;
  console.log(tokenData);
  const availabilitiesData = await fetchAvailability(activityId, token);
  return availabilitiesData;
}
