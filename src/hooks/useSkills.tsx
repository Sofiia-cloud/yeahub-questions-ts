import { useEffect, useState } from "react";

import type { Skill } from "../types";

interface ApiResponse {
  data: Skill[];
  page: number;
  limit: number;
  total: number;
}

function useSkills(): Array<Skill> {
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => {
    fetch("https://api.yeatwork.ru/skills")
      .then((response) => response.json())
      .then((data: ApiResponse) => setSkills(data?.data))
      .catch((error) => console.error("Error: ", error));
  }, []);
  return skills;
}

export default useSkills;
