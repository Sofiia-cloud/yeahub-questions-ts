import { Link } from "react-router-dom";
import styles from "./Question.module.css";
import LevelTag from "../LevelTag/LevelTag";
function Question({ question, isOpen, toggleQuestion }) {
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
