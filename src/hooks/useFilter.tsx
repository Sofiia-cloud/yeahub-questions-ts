import useSearchQuestions from "./useSearchQuestions";

interface User {
  id: string;
  username: string;
}
interface QuestionSpecialization {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

interface QuestionSkill {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  updatedAt: string;
}

interface QuestionTopic {
  id: number;
  title: string;
  description: string;
  imageSrc: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Question {
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
  questionSpecializations: QuestionSpecialization[];
  questionSkills: QuestionSkill[];
  questionTopics: QuestionTopic[];
}

interface QuestionsResponse {
  data: Question[];
  page: number;
  limit: number;
  total: number;
}

interface Filters {
  keywords: string;
  pageNumber: number;
  selectedSpec: string;
  selectedSkill: string;
  selectedLevels: string;
  selectedRating: string;
  selectedStatus: string;
}

interface FilterActions {
  setKeywords: (keywords: string) => void;
  setPageNumber: (pageNumber: number) => void;
  setSelectedSpec: (spec: string) => void;
  setSelectedSkill: (skill: string) => void;
  setSelectedLevels: (level: string) => void;
  setSelectedRating: (rating: string) => void;
  setSelectedStatus: (status: string) => void;
  clearFilters: () => void;
}

interface FilterValues extends Filters {
  questions: QuestionsResponse | null;
}

interface UseFilterReturn {
  filterValues: FilterValues;
  filterActions: FilterActions;
  loading: boolean;
}

function useFilter(): UseFilterReturn {
  const { filters, questions, updateFilters, loading } = useSearchQuestions();
  const filterActions: FilterActions = {
    setKeywords: (keywords: string) => updateFilters({ keywords }),
    setPageNumber: (pageNumber: number) => updateFilters({ pageNumber }),
    setSelectedSpec: (spec: string) => updateFilters({ selectedSpec: spec }),
    setSelectedSkill: (skill: string) =>
      updateFilters({ selectedSkill: skill }),
    setSelectedLevels: (level: string) =>
      updateFilters({ selectedLevels: level }),
    setSelectedRating: (rating: string) =>
      updateFilters({ selectedRating: rating }),
    setSelectedStatus: (status: string) =>
      updateFilters({ selectedStatus: status }),
    clearFilters: (): void =>
      updateFilters({
        keywords: "",
        selectedSpec: "",
        selectedSkill: "",
        selectedLevels: "",
        selectedRating: "",
        selectedStatus: "",
        pageNumber: 1,
      }),
  };

  return {
    filterValues: { ...filters, questions },
    filterActions,
    loading,
  };
}

export default useFilter;
