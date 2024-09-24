import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Project", "UserChecks", "WordCluster"],
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    mode: "cors",
    prepareHeaders: headers => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || "";
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      headers.set("Content-Type", "application/json;charset=utf-8");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
