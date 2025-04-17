import { zikrItem } from "@/types/azkarTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFetchAzkar = (category: string) => {
  const [azkar, setAzkar] = useState<zikrItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchAzkar = async () => {
    try {
      const response = await fetch(
        `https://azkar-api.up.railway.app/${category}`
      );

      const data = await response.json();
      return data;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["azkar", category],
    queryFn: fetchAzkar,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError };
};
