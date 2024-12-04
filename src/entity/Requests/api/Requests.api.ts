import { rtkApi } from "@shared/api/rtkApi";

import type { TBenefitData } from "@entity/Benefit/model/types/Benefit.types";
import type { TUserData } from "@entity/User/model/types/User.types";

export type TRequestStatus = "pending" | "approved" | "declined" | "processing";

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
    getAllRequests: build.query<TRequest[], { filter: string; sort: string }>({
      query: params => ({
        url: "/benefit-requests/?" + params.sort,
        ...(params.filter !== null ? { params: { status: params.filter, limit: 100 } } : { limit: 100 }),
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
    exportData: build.query<File, null>({
      query: () => ({
        url: "/benefit-requests/export",
        responseHandler: response => response.blob(),
      }),
    }),
    deleteRequests: build.mutation<null, number>({
      query: (id: number) => ({
        url: "/benefit-requests/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests", "User"],
    }),
    getUserRequests: build.query<TRequest[], null>({
      query: () => ({
        url: "/benefit-requests/current-user",
        params: { limit: 100 },
      }),
      providesTags: ["Requests"],
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
  useGetUserRequestsQuery,
  useLazyExportDataQuery,
  useDeleteRequestsMutation,
  useUpdateRequestsMutation,
  useCreateRequestsMutation,
} = RequestsApi;
