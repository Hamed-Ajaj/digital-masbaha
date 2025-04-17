import { HijriDate } from "@/types/hijriDate";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useFetchHijriDate = () => {
  // const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  const fetchHijriDate = async () => {
    try {
      const response = await fetch("https://api.aladhan.com/v1/gToH");
      const data = await response.json();
      return data.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return null;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["hijriDate"],
    queryFn: fetchHijriDate,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};
