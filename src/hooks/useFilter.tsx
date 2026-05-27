import useSearchQuestions from "./useSearchQuestions";
import type { FilterActions, UseFilterReturn } from "../types";

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
