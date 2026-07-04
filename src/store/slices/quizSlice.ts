import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AnswerStatus, IQuestion } from "../../services/types";

export interface QuizState {
  questions: IQuestion[];
  currentQuestionIndex: number;
  answers: Record<number, AnswerStatus>;
  isStarted: boolean;
  isFinished: boolean;
  startedAt: string | null;
  finishedAt: string | null;
  mode: "repeat" | "new" | "random" | null;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  isStarted: false,
  isFinished: false,
  startedAt: null,
  finishedAt: null,
  mode: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (
      state,
      action: PayloadAction<{
        questions: IQuestion[];
        startedAt: string;
        answers: Array<{ questionId: number; answer: AnswerStatus }>;
        mode?: "repeat" | "new" | "random";
      }>,
    ) => {
      state.questions = action.payload.questions;
      state.currentQuestionIndex = 0;
      state.isStarted = true;
      state.isFinished = false;
      state.startedAt = action.payload.startedAt;
      state.finishedAt = null;
      state.mode = action.payload.mode || null;
      state.answers = {};

      action.payload.answers.forEach(({ questionId, answer }) => {
        state.answers[questionId] = answer;
      });
    },
    setAnswer: (
      state,
      action: PayloadAction<{ questionId: number; status: AnswerStatus }>,
    ) => {
      state.answers[action.payload.questionId] = action.payload.status;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    finishQuiz: (state) => {
      state.isFinished = true;
      state.finishedAt = new Date().toISOString();
    },
    resetQuiz: () => initialState,
  },
});

export const {
  startQuiz,
  setAnswer,
  nextQuestion,
  previousQuestion,
  finishQuiz,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
