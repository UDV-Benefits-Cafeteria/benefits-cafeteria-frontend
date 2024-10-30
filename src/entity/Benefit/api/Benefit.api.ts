import { rtkApi } from "@shared/api/rtkApi";

import type { TBenefit, TBenefitData } from "@entity/Benefit/model/types/Benefit.types";

export const BenefitApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getBenefit: build.query<TBenefitData, number>({
      query: (id: number) => ({
        url: "/benefits/" + id,
      }),
    }),
    getAllBenefit: build.query<TBenefitData[], null>({
      query: () => ({
        url: "/benefits/",
      }),
    }),
    addBenefitImage: build.mutation<TBenefit, { image: string }>({
      query: (body: { image: string }) => ({
        method: "PATCH",
        url: `/benefits/${1}/image/`,
        body: { image: body.image },
      }),
    }),
    createBenefit: build.mutation<TBenefitData, TBenefit>({
      query: (body: TBenefit) => ({
        method: "POST",
        url: "/benefits/",
        body: body,
      }),
    }),
  }),
});

export const { useCreateBenefitMutation, useGetAllBenefitQuery, useGetBenefitQuery, useAddBenefitImageMutation } =
  BenefitApi;
