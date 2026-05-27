import { useEffect, useState } from "react";
import type { Specialization } from "../types";

interface ApiResponse {
  data: Specialization[];
  page: number;
  limit: number;
  total: number;
}
function useSpecializations(): Specialization[] {
  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  useEffect(() => {
    fetch("https://api.yeatwork.ru/specializations")
      .then((response) => response.json())
      .then((data: ApiResponse) => setSpecializations(data?.data))
      .catch((error) => console.error("Error: ", error));
  }, []);
  return specializations;
}

export default useSpecializations;
