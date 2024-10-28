import { rtkApi } from "@shared/api/rtkApi";

import type { TUserData } from "@entity/User/model/types/User.types";

type TVerifyEmailResponse = { id: number };
type TVerifyEmailData = { email: string };

type TSetPasswordResponse = { id: number };
type TSetPasswordData = { id?: number; password: string; re_password: string };

type TLoginResponse = { is_success: boolean };
type TLoginData = { email: string; password: string };

export const UserApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<TUserData, null>({
      query: () => ({
        url: "/users/me",
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
    createUser: build.mutation<TUserData, TUserData>({
      query: (body: TUserData) => ({
        method: "POST",
        url: "/users",
        body: body,
      }),
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useVerifyEmailMutation,
  useSetPasswordMutation,
  useLoginMutation,
  useCreateUserMutation,
} = UserApi;
