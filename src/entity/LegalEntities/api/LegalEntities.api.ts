import { rtkApi } from "@shared/api/rtkApi";

import { TPosition } from "@entity/Position/model/types/Position.types";
import {TLegalEntity} from "@entity/LegalEntities/model/types/LegalEntities.types";

export const LegalEntitiesApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getLegalEntities: build.query<TLegalEntity[], null>({
      query: () => ({
        url: "/legal-entities/",
      }),
      providesTags: ["LegalEntities"],
    }),

    createLegalEntities: build.mutation<TLegalEntity, string>({
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
