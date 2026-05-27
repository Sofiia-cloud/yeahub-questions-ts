import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailedQuestion.module.css";
import type { Question } from "../../types";

interface DetailedQuestionProps {
  question: Question;
}

function DetailedQuestion({ question }: DetailedQuestionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { questionId } = useParams<{ questionId: string }>();

  const currentId = parseInt(questionId || String(question.id), 10);
  const prevId = currentId - 1;
  const nextId = currentId + 1;

  const getShortLongAnswer = () => {
    if (question.longAnswer?.length <= 100) return question.longAnswer;

    return question.longAnswer?.slice(0, 100) + "...";
  };

  return (
    <div className={styles.detailedContainer}>
      <div className={styles.headerCard}>
        <h1>{question.title}</h1>
        <p>{question.description}</p>
      </div>

      <div className={styles.navigationCard}>
        <button
          className={styles.navButton}
          onClick={() => navigate(`/${prevId}`)}
        >
          ← Предыдущий
        </button>
        <button
          className={styles.navButton}
          onClick={() => navigate(`/${nextId}`)}
        >
          Следующий →
        </button>
      </div>

      <div className={styles.sectionCard}>
        <h2>Краткий ответ</h2>
        <div
          className={styles.answer}
          dangerouslySetInnerHTML={{
            __html: question.shortAnswer || "Нет краткого ответа",
          }}
        />
      </div>

      <div className={styles.sectionCard}>
        <h2>Развёрнутый ответ</h2>
        {isOpen ? (
          <>
            <div
              className={styles.answer}
              dangerouslySetInnerHTML={{
                __html: question.longAnswer || "Нет развёрнутого ответа",
              }}
            />
            <button
              className={styles.expandButton}
              onClick={() => setIsOpen(false)}
            >
              Свернуть ↑
            </button>
          </>
        ) : (
          <>
            <div
              className={styles.answer}
              dangerouslySetInnerHTML={{ __html: getShortLongAnswer() }}
            />
            {question.longAnswer?.length > 100 && (
              <button
                className={styles.expandButton}
                onClick={() => setIsOpen(true)}
              >
                Развернуть ↓
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DetailedQuestion;
