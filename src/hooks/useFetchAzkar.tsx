import { zikrItem } from "@/types/azkarTypes";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch azkar data by category
 * @param category - The category of azkar to fetch
 * @returns Query result with data, loading and error states
 */
export const useFetchAzkar = (category: string) => {
  const fetchAzkar = async (): Promise<zikrItem[]> => {
    const response = await fetch(
      `https://azkar-api-render.onrender.com/${category}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return response.json();
  };

  return useQuery<zikrItem[], Error>({
    queryKey: ["azkar", category],
    queryFn: fetchAzkar,
    refetchOnWindowFocus: false,
  });
};
