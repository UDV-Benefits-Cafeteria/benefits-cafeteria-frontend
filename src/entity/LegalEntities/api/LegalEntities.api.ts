import { rtkApi } from "@shared/api/rtkApi";

import { TPosition } from "@entity/Position/model/types/Position.types";

export const LegalEntitiesApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getLegalEntities: build.query<TPosition[], null>({
      query: () => ({
        url: "/legal-entities/",
      }),
      providesTags: ["LegalEntities"],
    }),

    createLegalEntities: build.mutation<TPosition, string>({
      query: (name: string) => ({
        url: "/legal-entities/",
        method: "POST",
        body: { name: name },
      }),
      invalidatesTags: ["LegalEntities"],
    }),
  }),
});

export const { useGetLegalEntitiesQuery, useCreateLegalEntitiesMutation } = LegalEntitiesApi;
