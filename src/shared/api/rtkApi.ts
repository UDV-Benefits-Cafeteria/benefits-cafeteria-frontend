import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookieValue } from "@shared/utils/getCookieValue";

export const rtkApi = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1",
    credentials: "include",
    mode: "cors",
    prepareHeaders: headers => {
      const csrfToken = getCookieValue("csrftoken");

      if (csrfToken) headers.set("X-CSRF-Token", csrfToken);
      headers.set("Content-Type", "application/json;charset=utf-8");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
