export function processAvailabilitiesData(
  data,
  currentTime,
  selectedDate,
  priceCategory
) {
  // Check if data is valid
  if (!Array.isArray(data)) {
    console.error("Invalid data format passed to processAvailabilitiesData");
    return [];
  }

  return data
    .reduce((acc, d) => {
      const { categories, startTime, availabilityItemId } = d;

      // Ensure categories is an array and has at least one item
      if (!Array.isArray(categories) || categories.length === 0) {
        return acc;
      }

      const startTimeString = startTime || "";
      const dateString = `${selectedDate}T${startTimeString}`;
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Europe/Zurich",
      });
      const formattedTime = formatter.format(new Date(dateString));

      const availabilityDate = new Date(dateString);
      const currentDate = new Date(selectedDate);

      // Check if the selected date is today's date
      const isToday =
        currentDate.getDate() === currentTime.getDate() &&
        currentDate.getMonth() === currentTime.getMonth() &&
        currentDate.getFullYear() === currentTime.getFullYear();

      if (
        !acc.some((item) => item.availabilityItemId === availabilityItemId) &&
        (!priceCategory || categories[0].name === priceCategory) &&
        (!isToday || (isToday && availabilityDate > currentTime))
      ) {
        acc.push({
          availabilityItemId,
          formattedTime,
          availableSeats: categories[0].availableSeats,
          name: categories[0].name,
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
          <strong>{item.availableSeats}</strong> seat
          {item.availableSeats === 1 ? "" : "s"}
        </div>
      </div>
    ));
}
