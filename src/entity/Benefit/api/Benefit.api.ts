import { rtkApi } from "@shared/api/rtkApi";

import type { TBenefit, TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

export const transform = (image: File, field: string) => {
  const formData = new FormData();

  formData.append(field, image);

  return formData;
};

export type TFilterParams = {
  is_active: boolean;
  adaptation_required: boolean;
  coins_cost: string;
  min_level_cost: string;
  categories: string;
};

export const BenefitApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getBenefit: build.query<TBenefitData, number>({
      query: (id: number) => ({
        url: "/benefits/" + id,
      }),
      providesTags: ["Benefits"],
    }),
    getAllBenefit: build.query<
      TBenefitData[],
      { filters?: Partial<TFilterParams>; sort?: string; search?: string; limit?: number }
    >({
      query: params => ({
        url:
          "/benefits/?" +
          (params?.sort ? params.sort : "") +
          (params?.filters?.categories ? "&" + params.filters?.categories : "") +
          `${params?.search ? "&query=" + params.search : ""}`,
        params: {
          ...(params?.filters ? params.filters : {}),
          limit: 100,
          categories: undefined,
        },
      }),
      providesTags: ["Benefits"],
    }),
    addBenefitImage: build.mutation<TBenefit, { id: number; image: File }>({
      query: (body: { id: number; image: File }) => ({
        method: "POST",
        url: `/benefits/${body.id}/images`,
        body: transform(body.image, "images"),
      }),
      invalidatesTags: ["Benefits"],
    }),
    deleteBenefitImage: build.mutation<TBenefit, { id: number; imagesId: number[] }>({
      query: (body: { id: number; imagesId: number[] }) => ({
        method: "DELETE",
        url: `/benefits/${body.id}/images`,
        body: body.imagesId,
      }),
      invalidatesTags: ["Benefits"],
    }),
    createBenefit: build.mutation<TBenefitData, TBenefit>({
      query: (body: TBenefit) => ({
        method: "POST",
        url: "/benefits/",
        body: body,
      }),
      invalidatesTags: ["Benefits"],
    }),
    editBenefit: build.mutation<TBenefitData, { id: number } & TBenefit>({
      query: (body: { id: number } & TBenefit) => ({
        method: "PATCH",
        url: "/benefits/" + body.id,
        body: body,
      }),
      invalidatesTags: ["Benefits"],
    }),
    importBenefitData: build.mutation<any, File>({
      query: param => ({
        url: "/benefits/upload",
        method: "POST",
        body: transform(param, "file"),
      }),
    }),
    exportData: build.query<File, null>({
      query: () => ({
        url: "/benefits/export",
        responseHandler: response => response.blob(),
      }),
    }),
    bulkBenefitCreate: build.mutation<any, any>({
      query: param => ({
        url: "/benefits/bulk_create",
        method: "POST",
        body: param,
      }),
      invalidatesTags: ["Benefits"],
    }),
  }),
});

export const {
  useBulkBenefitCreateMutation,
  useLazyExportDataQuery,
  useImportBenefitDataMutation,
  useCreateBenefitMutation,
  useGetAllBenefitQuery,
  useLazyGetAllBenefitQuery,
  useGetBenefitQuery,
  useDeleteBenefitImageMutation,
  useAddBenefitImageMutation,
  useEditBenefitMutation,
} = BenefitApi;
