import type { Specializations as Specialization } from "../services/types";

export interface Skill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: null | string;
  specializations: Specialization[];
}
