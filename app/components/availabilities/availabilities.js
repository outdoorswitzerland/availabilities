"use client";

import React, { useState, useEffect } from "react";

export const Availabilities = ({
  data,
  priceCategory,
  isLoading,
  selectedDate,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const availabilities = data
    ?.reduce((acc, d) => {
      const { categories, startTime, availabilityItemId } = d;

      const startTimeString = startTime;
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
        {isHydrated && <div>{item.formattedTime}</div>}
        <div className="text-right">
          <strong>{item.availableSeats}</strong> seat
          {item.availableSeats === 1 ? "" : "s"}
        </div>
      </div>
    ));

  if (availabilities.length === 0) {
    return (
      <div className="text-lg p-4">
        <p className="font-bold text-2xl">SOLD OUT</p>
        <p>
          Please ask a member of staff to help you find the next availability.
        </p>
      </div>
    );
  }

  return availabilities;
};
