import { useNavigate, useParams } from "react-router-dom";
import styles from "./Question.module.css";
import DetailedQuestion from "../../components/DetailedQuestion/DetailedQuestion";
import DetailedQuestionInfo from "../../components/DetailedQuestionInfo/DetailedQuestionInfo";
import { useGetQuestionByIdQuery } from "../../services/api/questionsApi";

function Question() {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const id = questionId ? parseInt(questionId, 10) : NaN;
  const { data: question, isLoading, error } = useGetQuestionByIdQuery(id);

  if (!questionId) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.error}>ID вопроса не указан</div>
      </>
    );
  }

  if (isNaN(id)) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.error}>Неверный ID вопроса</div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.loading}>Загрузка вопроса...</div>
      </>
    );
  }

  if (error || !question) {
    return (
      <>
        <button onClick={() => navigate(-1)} className={styles.link}>
          ← Назад
        </button>
        <div className={styles.error}>Вопрос не найден</div>
      </>
    );
  }

  return (
    <>
      <button onClick={() => navigate(-1)} className={styles.link}>
        ← Назад
      </button>

      <DetailedQuestion question={question} />
      <DetailedQuestionInfo question={question} />
    </>
  );
}

export default Question;
