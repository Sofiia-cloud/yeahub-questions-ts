import type { Specialization } from './specialization';

export interface Skill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: null | string;
  specializations: Specialization[];
}