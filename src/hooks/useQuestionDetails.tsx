import { useState, useEffect } from "react";

interface Question {
  id: number;
  title: string;
  slug: string;
  description: string;
  code: string | null;
  imageSrc: string | null;
  keywords: string[];
  longAnswer: string;
  shortAnswer: string;
  status: string;
  rate: number;
  complexity: number;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  updatedById: string;
  createdBy: {
    id: string;
    username: string;
  };
  updatedBy: {
    id: string;
    username: string;
  };
  questionSpecializations: Array<{
    id: number;
    title: string;
    slug: string;
    description: string;
    imageSrc: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  questionSkills: Array<{
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    createdAt: string;
    updatedAt: string;
  }>;
  questionTopics: Array<{
    id: number;
    title: string;
    description: string;
    imageSrc: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
}

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