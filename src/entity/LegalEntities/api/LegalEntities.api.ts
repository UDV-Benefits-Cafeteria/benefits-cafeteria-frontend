import { transform } from "@entity/Benefit/api/Benefit.api";
import { rtkApi } from "@shared/api/rtkApi";

import { TLegalEntity } from "@entity/LegalEntities/model/types/LegalEntities.types";

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

    importLegalEntitiesData: build.mutation<any, File>({
      query: param => ({
        url: "/legal-entities/upload",
        method: "POST",
        body: transform(param, "file"),
      }),
    }),
    exportLegalEntitiesData: build.query<File, null>({
      query: () => ({
        url: "/legal-entities/export",
        responseHandler: response => response.blob(),
      }),
    }),
    bulkLegalEntitiesCreate: build.mutation<any, any>({
      query: param => ({
        url: "/legal-entities/bulk_create",
        method: "POST",
        body: param,
      }),
      invalidatesTags: ["LegalEntities"],
    }),
  }),
});

export const {
  useGetLegalEntitiesQuery,
  useCreateLegalEntitiesMutation,
  useBulkLegalEntitiesCreateMutation,
  useLazyExportLegalEntitiesDataQuery,
  useImportLegalEntitiesDataMutation,
} = LegalEntitiesApi;
