export interface User {
  id: string;
  username: string;
}

export interface Specializations {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SpecializationsResponse {
  data: Specializations[];
}

export interface Skills {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
  specializations: Specializations[];
}

export interface SkillsResponse {
  data: Skills[];
  currentPage?: number;
}

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
  questionSpecializations: Specializations[];
  questionSkills: Skills[];
  questionTopics: QuestionTopic[];
}

export interface QuestionsResponse {
  data: Question[];
  total: number;
  limit: number;
  page: number;
}
export interface PublicQueryParams {
  page: number;
  limit: number;
  titleOrDescription?: string;
  specializationSlug?: string;
  skills?: string;
  complexity?: string;
  rate?: string;
}

export interface ISkill {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
}

export interface IAnswer {
  questionId: number;
  questionTitle: string;
  answer: "KNOWN" | "UNKNOWN";
}

export interface IInterviewResponse {
  answers: IAnswer[];
}

export interface IQuestion {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  createdById: string;
  updatedById: string;
  questionSpecializations: [];
  questionSkills: ISkill[];
}

export interface Interview {
  startDate: string;
  fullCount: number;
  response: IInterviewResponse;
  questions: IQuestion[];
}

export type AnswerStatus = "KNOWN" | "UNKNOWN";

export interface FilterValues {
  keywords: string;
  pageNumber: number;
  selectedSpec: string;
  selectedSkill: string;
  selectedLevels: string;
  selectedRating: string;
  selectedStatus: string;
  questions?: QuestionsResponse | null;
}

export interface FilterActions {
  setKeywords: (value: string) => void;
  setPageNumber: (value: number) => void;
  setSelectedSpec: (value: string) => void;
  setSelectedSkill: (value: string) => void;
  setSelectedLevels: (value: string) => void;
  setSelectedRating: (value: string) => void;
  setSelectedStatus: (value: string) => void;
  clearFilters: () => void;
}
