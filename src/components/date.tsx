import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { HijriDate } from "@/types/hijriDate";

const DateComponent = ({ darkMode }: { darkMode: boolean }) => {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHijriDate = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.aladhan.com/v1/gToH");
      const data = await response.json();
      setHijriDate(data.data.hijri);
      setLoading(false);
      return data.data;
    } catch (error) {
      console.error("Error fetching Hijri date:", error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const fetchDate = async () => {
      await fetchHijriDate();
    };

    fetchDate();

    // Refresh every hour
    const intervalId = setInterval(fetchDate, 3600000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div
        className={`flex justify-between items-center h-full mb-5 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <div className="space-y-2">
          <Skeleton>
            <div className="h-6 w-28"></div>
          </Skeleton>
          <Skeleton className="w-24">
            <div className="h-6 max-w-24"></div>
          </Skeleton>
        </div>
        <div>
          <Skeleton>
            <div className="h-6 w-28"></div>
          </Skeleton>
        </div>
      </div>
    );
  }

  if (!hijriDate) {
    return (
      <div
        className={`flex justify-center items-center h-full ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Unable to fetch date
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Month with date */}
      <div>
        <div
          className={`text-xl md:text-2xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {hijriDate?.month.ar} {hijriDate?.day}
        </div>
        <div
          className={`text-[11px] sm:text-sm ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {hijriDate?.month.en} {hijriDate?.year}
        </div>
      </div>

      {/* Weekday */}
      <div
        className={`text-[11px] sm:text-sm ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        {hijriDate?.weekday.ar} | {hijriDate?.weekday.en}
      </div>
    </div>
  );
};

export default DateComponent;
