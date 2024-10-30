import { rtkApi } from "@shared/api/rtkApi";

import type { TCategory } from "@entity/Category/model/types/Category.types";

export const CategoryApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getCategory: build.query<TCategory[], null>({
      query: () => ({
        url: "/categories/",
      }),
      providesTags: ["Categories"],
    }),

    createCategory: build.mutation<TCategory, string>({
      query: (name: string) => ({
        url: "/categories/",
        method: "POST",
        body: { name: name },
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetCategoryQuery } = CategoryApi;
