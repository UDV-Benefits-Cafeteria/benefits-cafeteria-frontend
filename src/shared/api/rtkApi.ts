import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    // @ts-ignore
    baseUrl: __API__,
    mode: "cors",
    prepareHeaders: headers => {
      headers.set("Content-Type", "application/json;charset=utf-8");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
