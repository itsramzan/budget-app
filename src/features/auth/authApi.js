import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          const { token, payload } = response.data;

          const data = { accessToken: token, user: payload };
          dispatch(userLoggedIn(data));
        } catch (err) {}
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          const { token, payload } = response.data;

          const data = { accessToken: token, user: payload };
          dispatch(userLoggedIn(data));
        } catch (err) {}
      },
    }),
  }),
});

export default authApi;
export const { useRegisterMutation, useLoginMutation } = authApi;
