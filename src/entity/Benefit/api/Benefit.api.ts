import { rtkApi } from "@shared/api/rtkApi";

import type { TBenefit, TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

export const BenefitApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getBenefit: build.query<TBenefitData, number>({
      query: (id: number) => ({
        url: "/benefits/" + id,
      }),
      providesTags: ["Benefits"],
    }),
    getAllBenefit: build.query<TBenefitData[], null>({
      query: () => ({
        url: "/benefits/",
      }),
      providesTags: ["Benefits"],
    }),
    addBenefitImage: build.mutation<TBenefit, { image: string }>({
      query: (body: { image: string }) => ({
        method: "PATCH",
        url: `/benefits/${1}/image/`,
        body: { image: body.image },
      }),
      invalidatesTags: ["Benefits"],
    }),
    createBenefit: build.mutation<TBenefitData, TBenefit>({
      query: (body: TBenefit) => ({
        method: "POST",
        url: "/benefits/",
        body: body,
      }),
    }),
    editBenefit: build.mutation<TBenefitData, { id: number } & TBenefit>({
      query: (body: { id: number } & TBenefit) => ({
        method: "PATCH",
        url: "/benefits/" + body.id,
        body: body,
      }),
      invalidatesTags: ["Benefits"],
    }),
  }),
});

export const {
  useCreateBenefitMutation,
  useGetAllBenefitQuery,
  useGetBenefitQuery,
  useAddBenefitImageMutation,
  useEditBenefitMutation,
} = BenefitApi;
