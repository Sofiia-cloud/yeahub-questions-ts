import { useEffect, useState } from "react";

interface Specialization {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Skill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  specializations: Array<Specialization>;
}

function useSkills(): Array<Skill> {
  const [skills, setSkills] = useState<Skill[]>([]);
  useEffect(() => {
    fetch("https://api.yeatwork.ru/skills")
      .then((response) => response.json())
      .then((data) => setSkills(data?.data))
      .catch((error) => console.error("Error: ", error));
  }, []);
  return skills;
}

export default useSkills;
