import Questions from "../components/Questions/Questions";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import useSpecializations from "../hooks/useSpecializations";
import useSkills from "../hooks/useSkills";
import useFilter from "../hooks/useFilter";

function Main() {
  const { filterValues, filterActions, loading } = useFilter();

  const specializations = useSpecializations();
  const skills = useSkills();

  const questions = filterValues.questions;
  const pageNumber = filterValues.pageNumber;
  if (loading) {
    return <div>Загрузка вопросов...</div>;
  }
  if (!questions) {
    return <div>Нет вопросов</div>;
  }
  return (
    <>
      <Questions
        questions={questions}
        loading={loading}
        pageNumber={pageNumber}
        setPageNumber={filterActions.setPageNumber}
      />
      <FilterPanel
        values={filterValues}
        actions={filterActions}
        data={{ specializations, skills }}
      />
    </>
  );
}

export default Main;
