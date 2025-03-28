import { useEffect, useState } from "react";

export const useFetchAzkar = () => {
  const [azkar, setAzkar] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAzkar = async () => {
    try {
      const response = await fetch(
        "https://azkar-api.up.railway.app/api/azkar"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch azkar");
      }
      const data = await response.json();
      setAzkar(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAzkar();
  }, []);
  return { azkar, loading, error };
};
