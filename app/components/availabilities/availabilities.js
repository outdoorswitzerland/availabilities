"use client";

import React, { useState, useEffect } from "react";
import { fetchAvailability } from "../../api/fetchAvailability.js";
import { processAvailabilitiesData } from "../../utils/processAvailabilitiesData.js";
import useAuthToken from "../../api/useAuthToken.js";

const Availabilities = ({ activity, date }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilitiesData, setAvailabilitiesData] = useState(null);
  const token = useAuthToken();

  const activityId = {
    jetboat: "305721",
    canyonSwingInterlaken: "87",
    canyonSwingGrindelwald: "87",
  };
  const activityPriceCategory = {
    jetboat: "",
    canyonSwingInterlaken: "Single Seat with Transport",
    canyonSwingGrindelwald: "Single Seat - Meeting Point Glacier Canyon",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute (60,000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [availabilitiesData]);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      try {
        if (token) {
          const data = await fetchAvailability(
            activityId[activity],
            token,
            date
          );
          setAvailabilitiesData(data);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Update every 1 min

    return () => {
      clearInterval(interval);
    };
  }, [date, activityId, token]);

  if (isLoading) {
    return <div className="m-10">Loading...</div>;
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
