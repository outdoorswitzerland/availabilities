"use client";

import React, { useState, useEffect } from "react";
import { fetchAvailabilityWithRefreshedToken } from "../api/route.js";
import { HeaderBar } from "./headerBar/headerBar.js";
import { Availabilities } from "./availabilities/availabilities.js";
import { formatDate } from "../utils/formatDate.js";

export default function ClientComponent({
  activityId,
  title,
  subTitle,
  jetboat,
  priceCategory,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [availabilitiesData, setAvailabilitiesData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAvailabilityWithRefreshedToken(
        activityId,
        selectedDate
      );
      setAvailabilitiesData(data);
      setIsLoading(false);
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData(); // Fetch new data every minute
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedDate, activityId]);

  if (isLoading) {
    return <div className="m-10">Loading...</div>;
  }

  return (
    <>
      <HeaderBar
        title={title}
        jetboat={jetboat}
        setSelectedDate={setSelectedDate}
        subTitle={subTitle}
      />
      <Availabilities
        data={availabilitiesData}
        selectedDate={selectedDate}
        priceCategory={priceCategory}
      />
    </>
  );
}
