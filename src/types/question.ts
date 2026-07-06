import type {
  User,
  Specializations as Specialization,
  Skills as Skill,
} from "../services/types";

export interface QuestionTopic {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string | null;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  createdBy: User;
  updatedBy: User;
  questionSpecializations: Specialization[];
  questionSkills: Skill[];
  questionTopics: QuestionTopic[];
}

export interface QuestionsResponse {
  data: Question[];
  page: number;
  limit: number;
  total: number;
}
