import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Access-Control-Allow-Origin", "*");
    }

    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      try {
        const refreshResult = await baseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions
        );
        const { token, payload } = refreshResult.data;

        const data = { accessToken: token, user: payload };
        api.dispatch(userLoggedIn(data));

        result = await baseQuery(args, api, extraOptions);
      } catch (err) {
        api.dispatch(userLoggedOut());
      }
    }
    return result;
  },
  tagTypes: ["budgets"],
  endpoints: (builder) => ({}),
});

export default apiSlice;
