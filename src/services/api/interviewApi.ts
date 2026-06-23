import { api } from "./index";
import type { Interview } from "../types";

interface InterviewParams {
  specializationSlug?: string;
  skills?: string;
  questionCount?: number;
}

const interviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInterview: builder.query<Interview, InterviewParams>({
      query: ({ specializationSlug, skills, questionCount }) => ({
        url: "/interview-preparation/quizzes/mock/new",
        params: { specializationSlug, skills, questionCount },
      }),
    }),
  }),
});

export const { useGetInterviewQuery, useLazyGetInterviewQuery } = interviewApi;
export default interviewApi;
