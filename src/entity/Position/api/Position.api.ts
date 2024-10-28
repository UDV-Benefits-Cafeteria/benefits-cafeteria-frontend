import { rtkApi } from "@shared/api/rtkApi";

import { TPosition } from "@entity/Position/model/types/Position.types";

export const PositionApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getPosition: build.query<TPosition[], null>({
      query: () => ({
        url: "/positions/",
      }),
      providesTags: ["Positions"],
    }),

    createPosition: build.mutation<TPosition, string>({
      query: (name: string) => ({
        url: "/positions/",
        method: "POST",
        body: { name: name },
      }),
      invalidatesTags: ["Positions"],
    }),
  }),
});

export const { useGetPositionQuery, useCreatePositionMutation } = PositionApi;
