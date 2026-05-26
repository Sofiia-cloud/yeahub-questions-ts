import { Pagination } from "../Pagination/Pagination";
import ReactMarkdown from "react-markdown";

import styles from "./Questions.module.css";
import { useState } from "react";
import Question from "../Question/Question";
function Questions({ questions, pageNumber, setPageNumber }) {
  const totalPages = Math.ceil(questions?.total / questions?.limit);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const toggleQuestion = (id) => {
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
