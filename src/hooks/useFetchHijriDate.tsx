import { HijriDate } from "@/types/hijriDate";
import { useEffect, useState } from "react";

export const useFetchHijriDate = () => {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHijriDate = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.aladhan.com/v1/gToH");
      const data = await response.json();
      setHijriDate(data.data.hijri);
      setLoading(false);
      return data.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setError(errorMessage);
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

  return { hijriDate, loading, error };
};
