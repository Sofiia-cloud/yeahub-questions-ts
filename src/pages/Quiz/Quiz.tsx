import QuizQuestion from "../../components/QuizQuestion/QuizQuestion";
import QuizResult from "../../components/QuizResult/QuizResult";
import QuizSetup from "../../components/QuizSetup/QuizSetup";
import { useAppSelector } from "../../store/hooks";
import styles from "./Quiz.module.css";

export default function Quiz() {
  const { isStarted, isFinished } = useAppSelector((state) => state.quiz);

  return (
    <div className={styles.container}>
      {!isStarted && !isFinished && <QuizSetup />}
      {isStarted && !isFinished && <QuizQuestion />}
      {isFinished && <QuizResult />}
    </div>
  );
}
