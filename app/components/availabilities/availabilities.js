"use client";

import React, { useState, useEffect } from "react";

export const Availabilities = ({ data, titleMatch }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, []);

  const availabilities = data
    ?.reduce((acc, d) => {
      const { categories, startTime, availabilityItemId } = d;

      const startTimeString = startTime;
      const dateString = `${
        currentTime.toISOString().split("T")[0]
      }T${startTimeString}`;
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Europe/Zurich",
      });
      const formattedTime = formatter.format(new Date(dateString));

      if (
        !acc.some((item) => item.availabilityItemId === availabilityItemId) &&
        (!titleMatch || categories[0].name === titleMatch)
        // && new Date(dateString) > currentTime
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
          <strong>{item.availableSeats}</strong> seats available
        </div>
      </div>
    ));

  return availabilities;
};
