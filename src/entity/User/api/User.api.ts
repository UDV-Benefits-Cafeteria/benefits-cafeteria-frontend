import { rtkApi } from "@shared/api/rtkApi";

type TVerifyEmailResponse = { id: number };
type TVerifyEmailData = { email: string };

export const UserApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    getUser: build.query({
      query: () => ({
        url: "/users/me",
      }),
    }),
    verifyEmail: build.mutation<TVerifyEmailResponse, TVerifyEmailData>({
      query: (body: { email: string }) => ({
        method: "POST",
        url: "/auth/verify",
        body: body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useVerifyEmailMutation } = UserApi;
