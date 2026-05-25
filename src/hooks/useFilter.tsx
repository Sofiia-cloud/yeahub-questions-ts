
import useSearchQuestions from './useSearchQuestions';

function useFilter() {
  
  const { filters, questions, updateFilters, loading } = useSearchQuestions();

  
  const filterActions = {
    setKeywords: (keywords) => updateFilters({ keywords }),
    setPageNumber: (pageNumber) => updateFilters({ pageNumber }),
    setSelectedSpec: (spec) => updateFilters({ selectedSpec: spec }),
    setSelectedSkill: (skill) => updateFilters({ selectedSkill: skill }),
    setSelectedLevels: (level) => updateFilters({ selectedLevels: level }),
    setSelectedRating: (rating) => updateFilters({ selectedRating: rating }),
    setSelectedStatus: (status) => updateFilters({ selectedStatus: status }),
    clearFilters: () => updateFilters({ 
      keywords: '',
      selectedSpec: '',
      selectedSkill: '',
      selectedLevels: '',
      selectedRating: '',
      selectedStatus: '',
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