"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchAvailability } from "../../api/fetchAvailability.js";
import { processAvailabilitiesData } from "../../utils/processAvailabilitiesData.js";
import useAuthToken from "../../api/useAuthToken.js";

const Availabilities = ({ activity, date }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilitiesData, setAvailabilitiesData] = useState([]);
  const token = useAuthToken();

  const activityId = {
    jetboat: "305721",
    canyonSwingInterlaken: "87",
    canyonSwingGrindelwald: "87",
  };
  const activityPriceCategory = {
    jetboat: "",
    canyonSwingInterlaken: "from Interlaken: Single Seat",
    canyonSwingGrindelwald: "from Grindelwald: Single Seat",
  };

  // Update the current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [availabilitiesData]);

  // Fetch data
  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    const minLoadingTime = new Promise((resolve) => setTimeout(resolve, 500)); // 500 ms

    try {
      if (token) {
        const fetchPromise = fetchAvailability(
          activityId[activity],
          token,
          date
        );
        const data = await Promise.all([fetchPromise, minLoadingTime]).then(
          (values) => values[0]
        );

        if (Array.isArray(data)) {
          setAvailabilitiesData(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setError("Fetched data is not in the expected format.");
          setAvailabilitiesData([]);
        }

        // setAvailabilitiesData(data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setAvailabilitiesData([]); // Ensure it's set to an empty array in case of error
    } finally {
      setIsLoading(false);
    }
  }, [activityId[activity], token, date]);

  // Fetch data on mount and every minute
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex justify-between gap-4 mb-4 p-4 text-2xl rounded-lg border border-neutral-300">
              <div className="bg-neutral-200 h-6 w-24 rounded"></div>
              <div className="bg-neutral-200 h-6 w-24 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-10">
        <p>Error: {error}</p>
        <button onClick={fetchData}>Retry</button>
      </div>
    );
  }

  const availabilities = processAvailabilitiesData(
    availabilitiesData,
    currentTime,
    date,
    activityPriceCategory[activity]
  );

  if (availabilities.length === 0) {
    return (
      <div className="text-lg p-4 border border-neutral-300 rounded-lg">
        <p className="font-bold text-2xl text-oRed">SOLD OUT</p>
        <p>
          Please ask a member of staff to help you find the next availability.
        </p>
      </div>
    );
  }

  return availabilities;
};

export default Availabilities;
