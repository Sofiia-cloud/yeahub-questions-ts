import { Pagination } from "../Pagination/Pagination";

import styles from "./Questions.module.css";
import { useState } from "react";
import Question from "../Question/Question";
import type { Question as QuestionType } from "../../types";
interface QuestionsProps {
  questions: {
    total: number;
    limit: number;
    data: QuestionType[];
  };
  pageNumber: number;
  setPageNumber: (page: number) => void;
}
function Questions({ questions, pageNumber, setPageNumber }: QuestionsProps) {
  const totalPages = Math.ceil(questions?.total / questions?.limit);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const toggleQuestion = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };
  return (
    <div className={styles.questionContainer}>
      <h2>Вопросы</h2>
      <hr />
      <ul>
        {questions?.data.map((question) => {
          const isOpen = openQuestionId === question.id;
          return (
            <Question
              key={question.id}
              question={question}
              isOpen={isOpen}
              toggleQuestion={toggleQuestion}
            />
          );
        })}
      </ul>
      <Pagination
        page={pageNumber}
        total={totalPages}
        onChange={setPageNumber}
      />
    </div>
  );
}

export default Questions;
