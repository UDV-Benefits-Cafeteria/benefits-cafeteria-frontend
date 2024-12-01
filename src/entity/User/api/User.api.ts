import { rtkApi } from "@shared/api/rtkApi";

import type { TUserData } from "@entity/User/model/types/User.types";

type TVerifyEmailResponse = { id: number };
type TVerifyEmailData = { email: string };

type TSetPasswordResponse = { id: number };
type TSetPasswordData = { id?: number; password: string; re_password: string };

type TLoginResponse = { is_success: boolean };
type TLoginData = { email: string; password: string };

type TAddImageData = { image: File; id: number };

const transform = (image: File) => {
  const formData = new FormData();

  formData.append("image", image);

  return formData;
};

export const UserApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<TUserData, null>({
      query: () => ({
        url: "/users/me",
      }),
      providesTags: ["User"],
    }),
    getAllUser: build.query<TUserData[], { filters?: object; sort?: string; search?: string }>({
      query: params => ({
        url: "/users?" + params.sort + "&" + params.filters?.legal_entities,
        params: { ...params.filters, legal_entities: undefined, ...(params.search ? { query: params.search } : {}) },
      }),
      providesTags: ["User"],
    }),
    verifyEmail: build.mutation<TVerifyEmailResponse, TVerifyEmailData>({
      query: (body: TVerifyEmailData) => ({
        method: "POST",
        url: "/auth/verify",
        body: body,
      }),
    }),
    logout: build.mutation<null, null>({
      query: () => ({
        method: "POST",
        url: "/auth/logout",
      }),
      invalidatesTags: ["User"],
    }),
    setPassword: build.mutation<TSetPasswordResponse, TSetPasswordData>({
      query: (body: TSetPasswordData) => ({
        method: "POST",
        url: "/auth/signup",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation<TLoginResponse, TLoginData>({
      query: (body: TLoginData) => ({
        method: "POST",
        url: "/auth/signin",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    addImage: build.mutation<TUserData, TAddImageData>({
      query: (body: TAddImageData) => ({
        method: "PATCH",
        url: `/users/${body.id}/image`,
        body: transform(body.image),
      }),
    }),
    createUser: build.mutation<TUserData, TUserData>({
      query: (body: TUserData) => ({
        method: "POST",
        url: "/users/",
        body: body,
      }),
    }),
    editUser: build.mutation<TUserData, { id: number } & Partial<TUserData>>({
      query: (body: { id: number } & TUserData) => ({
        method: "PATCH",
        url: "/users/" + body.id,
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
    getCurrentUser: build.query<TUserData, number>({
      query: (id: number) => ({
        url: "/users/" + id,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useVerifyEmailMutation,
  useSetPasswordMutation,
  useLoginMutation,
  useCreateUserMutation,
  useAddImageMutation,
  useGetAllUserQuery,
  useLogoutMutation,
  useEditUserMutation,
  useGetCurrentUserQuery,
} = UserApi;
