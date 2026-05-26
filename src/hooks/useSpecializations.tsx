import { useEffect, useState } from "react";
interface Specialization {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
}

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
