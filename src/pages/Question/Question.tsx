import { Link, useParams } from "react-router-dom";
import useQuestionDetails from "../../hooks/useQuestionDetails";
import styles from "./Question.module.css";
import DetailedQuestion from "../../components/DetailedQuestion/DetailedQuestion";
import DetailedQuestionInfo from "../../components/DetailedQuestionInfo/DetailedQuestionInfo";

function Question() {
  const { questionId } = useParams<{ questionId: string }>();
  const id = questionId ? parseInt(questionId, 10) : undefined;
  const question = useQuestionDetails(id!);

  if (!question) {
    return (
      <>
        <Link to={"/"} className={styles.link}>
          ← Назад
        </Link>
        <div className={styles.error}>{"Вопрос не найден"}</div>
      </>
    );
  }
  return (
    <>
      <Link to={"/"} className={styles.link}>
        ← Назад
      </Link>

      <DetailedQuestion question={question} />
      <DetailedQuestionInfo question={question} />
    </>
  );
}

export default Question;
