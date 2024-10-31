import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookieValue } from "@shared/utils/getCookieValue";

export const rtkApi = createApi({
  reducerPath: "api",
  tagTypes: ["User", "Positions", "LegalEntities", "Categories", "Requests", "Benefits"],
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    credentials: "include",
    mode: "cors",
    headers: { "content-type": "application/json;charset=utf-8" },
    prepareHeaders: headers => {
      const csrfToken = getCookieValue("csrftoken");

      if (csrfToken) headers.set("X-CSRF-Token", csrfToken);
      headers.set("Content-Type", "application/json;charset=utf-8");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
