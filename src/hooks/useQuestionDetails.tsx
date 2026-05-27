import { useState, useEffect } from "react";
import type { Question } from "../types";

function useQuestionDetails(questionId: number): Question | null {
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    fetch(`https://api.yeatwork.ru/questions/public-questions/${questionId}`)
      .then((response) => response.json())
      .then((data: Question) => setQuestion(data))
      .catch((error) => console.error(error.message));
  }, [questionId]);

  return question;
}

export default useQuestionDetails;
