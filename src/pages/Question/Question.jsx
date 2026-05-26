import { Link, useParams } from "react-router-dom";
import useQuestionDetails from "../../hooks/useQuestionDetails";
import styles from "./Question.module.css";
import DetailedQuestion from "../../components/DetailedQuestion/DetailedQuestion";
import DetailedQuestionInfo from "../../components/DetailedQuestionInfo/DetailedQuestionInfo";

function Question() {
  const { questionId } = useParams();
  const question = useQuestionDetails(questionId);

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
