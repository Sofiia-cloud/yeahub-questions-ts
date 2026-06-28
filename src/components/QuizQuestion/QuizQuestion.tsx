import { useState } from "react";
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
  const [isAnswer, setIsAnswer] = useState(false);
  const { questions, currentQuestionIndex, isFinished, answers } =
    useAppSelector((state) => state.quiz);

  if (isFinished) {
    return null;
  }
  if (!questions.length) {
    return <p className={styles.empty}>Нет вопросов</p>;
  }

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentAnswer = answers[question.id] || "";

  const handleAnswer = (status: "KNOWN" | "UNKNOWN") => {
    dispatch(setAnswer({ questionId: question.id, status }));
  };

  const toggleAnswer = () => {
    setIsAnswer(!isAnswer);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  return (
    <div className={styles.container}>
     
      <div className={styles.questionCard}>
        <h1 className={styles.header}>Вопросы собеседования</h1>
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

     
      <div className={styles.questionCard}>
       
        <div className={styles.topNavigation}>
          <button
            className={styles.arrowButton}
            onClick={() => dispatch(previousQuestion())}
            disabled={isFirstQuestion}
          >
            ←
          </button>
          <button
            className={styles.arrowButton}
            onClick={() => dispatch(nextQuestion())}
            disabled={isLastQuestion}
          >
            →
          </button>
        </div>

        <h2 className={styles.questionTitle}>{question.title}</h2>

     
        <button className={styles.showAnswerButton} onClick={toggleAnswer}>
          {isAnswer ? "Скрыть ответ" : "Посмотреть ответ"}
        </button>

      
        {isAnswer && (
          <div
            className={styles.answer}
            dangerouslySetInnerHTML={{ __html: question.shortAnswer }}
          />
        )}

    
        <div className={styles.answerSection}>
          <button
            className={`${styles.answerButton} ${
              currentAnswer === "UNKNOWN" ? styles.active : ""
            }`}
            onClick={() => handleAnswer("UNKNOWN")}
          >
            Не знаю
          </button>
          <button
            className={`${styles.answerButton} ${
              currentAnswer === "KNOWN" ? styles.active : ""
            }`}
            onClick={() => handleAnswer("KNOWN")}
          >
            Знаю
          </button>
        </div>

        <hr />

       
        <div className={styles.bottomNavigation}>
          <button
            className={styles.finishButton}
            onClick={() => dispatch(finishQuiz())}
          >
            Завершить
          </button>
        </div>
      </div>
    </div>
  );
}
