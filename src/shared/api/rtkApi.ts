import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    // @ts-ignore
    baseUrl: "http://localhost:8000/api/v1",
    mode: "cors",
    prepareHeaders: headers => {
      headers.set("Content-Type", "application/json;charset=utf-8");
      headers.set("access-origin", "*");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
