import { useQuery } from "@tanstack/react-query";

export const useFetchHijriDate = () => {
  const fetchHijriDate = async () => {
    try {
      const response = await fetch("https://api.aladhan.com/v1/gToH");
      if (!response.ok) return null;
      const data = await response.json();
      return data.data;
    } catch {
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
