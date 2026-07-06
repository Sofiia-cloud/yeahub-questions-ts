import Questions from "../components/Questions/Questions";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import {
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} from "../services/api/filtersApi";
import { useState } from "react";
import { useGetQuestionsQuery } from "../services/api/questionsApi";

interface FiltersState {
  page: number;
  search: string;
  specializationSlug: string;
  skills: string;
  complexity: string;
  rating: string;
  status: string;
}

function Main() {
  const [filters, setFilters] = useState<FiltersState>({
    page: 1,
    search: "",
    specializationSlug: "",
    skills: "",
    complexity: "",
    rating: "",
    status: "",
  });

  const { data: specializations, isLoading: specsLoading } =
    useGetSpecializationsQuery();
  const { data: skills, isLoading: skillsLoading } = useGetSkillsQuery();

  const { data: questionsData, isLoading: questionsLoading } =
    useGetQuestionsQuery({
      currentPage: filters.page,
      search: filters.search,
      filters: {
        specializationSlug: filters.specializationSlug
          ? filters.specializationSlug
          : undefined,
        skills: filters.skills
          ? filters.skills
              .split(",")
              .map(Number)
              .filter((n) => !isNaN(n))
          : [],
        complexity: filters.complexity
          ? filters.complexity.split(",").map(Number)
          : [],
        rate: filters.rating ? filters.rating.split(",").map(Number) : [],
      },
    });

  const updateFilters = (newFilters: Partial<FiltersState>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  const setPageNumber = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      search: "",
      specializationSlug: "",
      skills: "",
      complexity: "",
      rating: "",
      status: "",
    });
  };

  if (questionsLoading || specsLoading || skillsLoading) {
    return <div>Загрузка вопросов...</div>;
  }

  if (!questionsData) {
    return <div>Нет вопросов</div>;
  }

  return (
    <>
      <Questions
        questions={questionsData}
        pageNumber={filters.page}
        setPageNumber={setPageNumber}
      />
      <FilterPanel
        values={{
          keywords: filters.search,
          pageNumber: filters.page,
          selectedSpec: filters.specializationSlug,
          selectedSkill: filters.skills,
          selectedLevels: filters.complexity,
          selectedRating: filters.rating,
          selectedStatus: filters.status,
        }}
        actions={{
          setKeywords: (value: string) => updateFilters({ search: value }),
          setPageNumber,
          setSelectedSpec: (value: string) => {
            updateFilters({ specializationSlug: value });
          },
          setSelectedSkill: (value: string) => updateFilters({ skills: value }),
          setSelectedLevels: (value: string) =>
            updateFilters({ complexity: value }),
          setSelectedRating: (value: string) =>
            updateFilters({ rating: value }),
          setSelectedStatus: (value: string) =>
            updateFilters({ status: value }),
          clearFilters,
        }}
        data={{ specializations: specializations || [], skills: skills || [] }}
      />
    </>
  );
}

export default Main;
