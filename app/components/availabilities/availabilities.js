"use client";

import React, { useState, useEffect } from "react";
import { fetchAvailability } from "../../api/fetchAvailability.js";
import { processAvailabilitiesData } from "../../utils/processAvailabilitiesData.js";
import useAuthToken from "../../api/useAuthToken.js";
import { useDate } from "../../context/dateContext";

const Availabilities = ({ activityId, priceCategory }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilitiesData, setAvailabilitiesData] = useState(null);
  const { selectedDate } = useDate();
  const token = useAuthToken();

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
          const data = await fetchAvailability(activityId, token, selectedDate);
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
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedDate, activityId, token]);

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
    selectedDate,
    priceCategory
  );

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

export default Availabilities;
