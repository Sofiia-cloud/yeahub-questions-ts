import {api} from ".";
import type {
  Skills,
  Specializations,
  SkillsResponse,
  SpecializationsResponse,
} from "../types";

const filtersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSpecializations: builder.query<Specializations[], void>({
      query: () => "/specializations",
      transformResponse: (
        response: SpecializationsResponse,
      ): Specializations[] => response.data,
      providesTags: ["Filter"],
    }),
    getSkills: builder.query<Skills[], void>({
      query: () => "/skills",
      transformResponse: (response: SkillsResponse): Skills[] => response.data,
      providesTags: ["Filter"],
    }),
  }),
});

export const { useGetSpecializationsQuery, useGetSkillsQuery } = filtersApi;
export default filtersApi;