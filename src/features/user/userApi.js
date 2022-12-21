import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      keepUnusedDataFor: 3600,
    }),
    updateDetails: builder.mutation({
      query: (data) => ({
        url: "/user/updateDetails",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.result?._id) {
            // Update url cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("profile", undefined, (draft) => {
                const { bio, gender, dateOfBirth, mobile, address } =
                  response.data.result;
                draft.result = {
                  ...draft.result,
                  bio,
                  gender,
                  dateOfBirth,
                  mobile,
                  address,
                };
              })
            );
            // Update url cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    avatarUpload: builder.mutation({
      query: (data) => ({
        url: "/user/avatarUpload",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.result?._id) {
            // Update url cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("profile", undefined, (draft) => {
                const { avatarUrl } = response.data.result;

                draft.result.avatarUrl = avatarUrl;
              })
            );
            // Update url cache pessimistically end
          }
        } catch (err) {}
      },
    }),
  }),
});

export default userApi;
export const {
  useProfileQuery,
  useUpdateDetailsMutation,
  useAvatarUploadMutation,
} = userApi;
