import { api } from "./index";
import type { Interview } from "../types";

interface InterviewParams {
  specialization?: number;
  skills?: string;
  complexity?: string;
  limit?: number;
  mode?: "repeat" | "new" | "random";
}

const interviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInterview: builder.query<Interview, InterviewParams>({
      query: ({ specialization, skills, complexity, limit = 10, mode }) => {
        const params: Record<string, string | number | undefined> = {
          specialization,
          skills,
          limit,
          mode,
        };

        if (complexity) {
          params.complexity = complexity;
        }

        return {
          url: "/interview-preparation/quizzes/mock/new",
          params,
        };
      },
    }),
  }),
});

export const { useGetInterviewQuery, useLazyGetInterviewQuery } = interviewApi;
export default interviewApi;
