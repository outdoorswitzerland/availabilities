import { formatDate } from "../utils/formatDate";

const trekksoftApiBaseUrl = "https://api2.trekksoft.com";

export async function fetchAvailability(activityId, token, selectedDate) {
  const formattedDate = formatDate(new Date(selectedDate));
  const apiParams = `?activeOnly=false&startsFrom=${formattedDate}&startsTo=${formattedDate}`;
  const urlAvailabilities = `${trekksoftApiBaseUrl}/activities/${activityId}/availabilities${apiParams}`;

  const controller = new AbortController();
  const { signal } = controller;

  setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

  try {
    const res = await fetch(urlAvailabilities, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
      cache: "no-store",
      next: {
        revalidate: 60, // Revalidate every minute
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("The request took too long. Please try again.");
    } else {
      throw err;
    }
  }
}
