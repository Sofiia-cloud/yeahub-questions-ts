import type { QuestionsResponse } from "./question";

export interface Filters {
  keywords: string;
  pageNumber: number;
  selectedSpec: string;
  selectedSkill: string;
  selectedLevels: string;
  selectedRating: string;
  selectedStatus: string;
}

export interface FilterActions {
  setKeywords: (value: string) => void;
  setPageNumber: (value: number) => void;
  setSelectedSpec: (value: string) => void;
  setSelectedSkill: (value: string) => void;
  setSelectedLevels: (value: string) => void;
  setSelectedRating: (value: string) => void;
  setSelectedStatus: (value: string) => void;
  clearFilters?: () => void;
}

export interface FilterValues extends Filters {
  questions: QuestionsResponse | null;
}

export interface UseFilterReturn {
  filterValues: FilterValues;
  filterActions: FilterActions;
  loading: boolean;
}
