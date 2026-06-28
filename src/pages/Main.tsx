import Questions from "../components/Questions/Questions";
import FilterPanel from "../components/FilterPanel/FilterPanel";

import useFilter from "../hooks/useFilter";
import {
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} from "../services/api/filtersApi";

function Main() {
  const { filterValues, filterActions, loading } = useFilter();

  const { data: specializations, isLoading: specsLoading } =
    useGetSpecializationsQuery();
  const { data: skills, isLoading: skillsLoading } = useGetSkillsQuery();

  const questions = filterValues.questions;
  const pageNumber = filterValues.pageNumber;
  if (loading || specsLoading || skillsLoading) {
    return <div>Загрузка вопросов...</div>;
  }
  if (!questions) {
    return <div>Нет вопросов</div>;
  }
  return (
    <>
      <Questions
        questions={questions}
        pageNumber={pageNumber}
        setPageNumber={filterActions.setPageNumber}
      />
      <FilterPanel
        values={filterValues}
        actions={filterActions}
        data={{ specializations: specializations || [], skills: skills || [] }}
      />
    </>
  );
}

export default Main;
