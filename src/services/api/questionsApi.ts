
import { api } from "../api";
import type { Question, PublicQueryParams, QuestionsResponse } from "../types";

interface QuestionFilters {
  skills?: number[];
  specializationSlug?: string;
  rate?: number[];
  complexity?: number[];
}

interface GetQuestionsArgs {
  filters?: QuestionFilters;
  currentPage: number;
  search?: string;
}

export const buildPublicQuery = ({
  filters = {},
  currentPage,
  search,
}: GetQuestionsArgs): PublicQueryParams => {
  const params: PublicQueryParams = {
    page: currentPage,
    limit: 10,
  };

  if (search?.trim()) {
    params.titleOrDescription = search.trim();
  }

  if (filters.specializationSlug) {
    params.specializationSlug = filters.specializationSlug;
  }

  if (filters.skills?.length) {
    params.skills = filters.skills.join(",");
  }

  if (filters.complexity?.length) {
    params.complexity = filters.complexity.join(",");
  }

  if (filters.rate?.length) {
    params.rate = filters.rate.join(",");
  }

  return params;
};

const questionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionsResponse, GetQuestionsArgs>({
      query: ({ filters, currentPage, search }) => {
        const params = buildPublicQuery({ filters, currentPage, search });
        
        return {
          url: "questions/public-questions",
          params,
        };
      },
      providesTags: ["Questions"],
    }),
    getQuestionById: builder.query<Question, number>({
      query: (id) => ({
        url: `questions/public-questions/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Questions", id }],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useLazyGetQuestionsQuery,
  useGetQuestionByIdQuery,
} = questionsApi;
export default questionsApi;
