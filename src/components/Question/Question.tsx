import { Link } from "react-router-dom";
import styles from "./Question.module.css";
import LevelTag from "../LevelTag/LevelTag";

interface QuestionProps {
  question: {
    id: number;
    title: string;
    imageSrc: string | null;
    shortAnswer: string;
    rate: number;
    complexity: number;
  };
  isOpen: boolean;
  toggleQuestion: (id: number) => void;
}
function Question({ question, isOpen, toggleQuestion }: QuestionProps) {
  return (
    <li key={question.id}>
      <h3>{question.title}</h3>
      <button
        className={`${styles.arrowButton} ${isOpen ? styles.open : ""}`}
        onClick={() => toggleQuestion(question.id)}
      >
        {isOpen ? "▲" : "▼"}
      </button>
      {isOpen && (
        <>
          <LevelTag question={question} />

          {question.imageSrc && (
            <img src={question.imageSrc} alt="Изображение ответа" />
          )}
          <p dangerouslySetInnerHTML={{ __html: question.shortAnswer }} />
          <Link className={styles.link} to={`/${question.id}`}>
            Подробнее →
          </Link>
        </>
      )}
    </li>
  );
}

export default Question;
