import { rtkApi } from "@shared/api/rtkApi";

import type { TBenefit, TBenefitData } from "@entity/Benefit/model/types/Benefit.types";
import type { TUserData } from "@entity/User/model/types/User.types";

export type TRequestStatus = "pending" | "approved" | "declined";

type TRequestData = {
  benefit_id: number;
  user_id: number;
  status: TRequestStatus;
};

type TRequestDataUpdate = {
  id: number;
  status: TRequestStatus;
  content: string;
  comment: string;
};

type TRequest = {
  id: number;
  benefit_id: number;
  user_id: number;
  status: TRequestStatus;
  content: string;
  comment: string;
  created_at: string;
  benefit: TBenefitData;
  user: TUserData;
};

export const RequestsApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getAllRequests: build.query<TRequest[], null>({
      query: () => ({
        url: "/benefit-requests/",
      }),
      providesTags: ["Requests"],
    }),
    createRequests: build.mutation<TRequest, TRequestData>({
      query: (body: TRequestData) => ({
        url: "/benefit-requests/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Requests", "User"],
    }),
    deleteRequests: build.mutation<null, number>({
      query: (id: number) => ({
        url: "/benefit-requests/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests", "User"],
    }),
    getUserRequests: build.mutation<TRequest[], null>({
      query: () => ({
        url: "/benefit-requests/current-user",
      }),
      invalidatesTags: ["Requests"],
    }),
    updateRequests: build.mutation<null, Partial<TRequestDataUpdate>>({
      query: (body: TRequestDataUpdate) => ({
        url: "/benefit-requests/" + body.id,
        method: "PATCH",
        body: {
          status: body.status,
          content: body.content,
          comment: body.comment,
        },
      }),
      invalidatesTags: ["Requests", "User"],
    }),
  }),
});

export const {
  useGetAllRequestsQuery,
  useGetUserRequestsMutation,
  useDeleteRequestsMutation,
  useUpdateRequestsMutation,
  useCreateRequestsMutation,
} = RequestsApi;
