"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HeaderBar from "@/components/headerBar/headerBar";
import Availabilities from "@/components/availabilities/availabilities";
import { format, addDays, isToday, isTomorrow, set } from "date-fns";
import { useDateStore } from "@/store/dateStore";
import { useEffect } from "react";

// Create Param URL
export const createUrl = (pathname, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export function AvailableDates({ activity }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { days, setDays, selectedDate } = useDateStore();

  useEffect(() => {
    const daysFromUrl = parseInt(searchParams?.get("days"), 10) || 1;
    setDays(daysFromUrl);
  }, [searchParams, setDays]);

  const updateDays = (change) => {
    const newDays = Math.max(1, days + change);
    const daysSearchParams = new URLSearchParams(searchParams.toString());
    daysSearchParams.set("days", String(newDays));
    const daysUrl = createUrl(pathname, daysSearchParams);
    router.replace(daysUrl, { scroll: false });
    setDays(newDays);
  };

  const datesToDisplay = Array.from({ length: days }, (_, i) => {
    const date = addDays(selectedDate, i);
    const dateForFunction = format(date, "yyyy-MM-dd");
    let dateForDisplay;

    if (isToday(date)) {
      dateForDisplay = (
        <>
          Today | Heute | <span className="arabicText">اليوم</span>
        </>
      );
    } else if (isTomorrow(date)) {
      dateForDisplay = (
        <>
          Tomorrow | Morgen | <span className="arabicText">غدًا</span>
        </>
      );
    } else {
      dateForDisplay = format(date, "MMMM dd");
    }

    return { dateForFunction, dateForDisplay };
  });

  return (
    <>
      <HeaderBar activity={activity} />
      <div className="space-y-16">
        {datesToDisplay.map(({ dateForFunction, dateForDisplay }) => (
          <div key={dateForFunction}>
            <div className="text-3xl mb-4 font-semibold mx-1">
              {dateForDisplay}
            </div>
            <Availabilities activity={activity} date={dateForFunction} />
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center mt-4">
        <div className="mr-2">Days</div>
        <button
          onClick={() => updateDays(-1)}
          className="rounded-full p-1 border w-8 h-8 mx-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M8 16c0-.6.4-1 1-1h14c.5 0 1 .4 1 1 0 .5-.5 1-1 1H9c-.6 0-1-.5-1-1z"></path>
          </svg>
        </button>
        <button
          onClick={() => updateDays(1)}
          className="rounded-full p-1 border w-8 h-8 mx-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M17 15V9c0-.6-.4-1-1-1s-1 .4-1 1v6H9c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1h-6z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
