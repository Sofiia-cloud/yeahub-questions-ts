import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  finishQuiz,
  nextQuestion,
  previousQuestion,
  setAnswer,
} from "../../store/slices/quizSlice";

import styles from "./QuizQuestion.module.css";

export default function QuizQuestion() {
  const dispatch = useAppDispatch();
  const { questions, currentQuestionIndex, isFinished, answers } =
    useAppSelector((state) => state.quiz);

  if (isFinished) {
    return null;
  }
  if (!questions.length) {
    return <p>Нет вопросов</p>;
  }

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[question.id] || "";

  const handleAnswer = (status: "KNOWN" | "UNKNOWN") => {
    dispatch(setAnswer({ questionId: question.id, status }));
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div>
      <div>
        <h1>Вопросы собеседования</h1>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
      </div>
      <div>
        <button
          onClick={() => dispatch(previousQuestion())}
          disabled={currentQuestionIndex === 0}
        >
          ← Назад
        </button>
        <button
          onClick={() => dispatch(nextQuestion())}
          disabled={isLastQuestion}
        >
          Далее →
        </button>
        <div className={styles.questionCard}>
          <h2 className={styles.questionTitle}>{question.title}</h2>

          <button className={styles.showAnswerButton}>Посмотреть ответ</button>
        </div>
        <button
          className={`${styles.answerButton} ${styles.unknownButton} ${currentAnswer === "UNKNOWN" ? styles.active : ""}`}
          onClick={() => handleAnswer("UNKNOWN")}
        >
          Не знаю
        </button>
        <button
          className={`${styles.answerButton} ${styles.knownButton} ${currentAnswer === "KNOWN" ? styles.active : ""}`}
          onClick={() => handleAnswer("KNOWN")}
        >
          Знаю
        </button>
        <hr />
        <button onClick={() => dispatch(finishQuiz())}>Завершить</button>
      </div>
    </div>
  );
}
