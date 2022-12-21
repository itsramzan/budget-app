import apiSlice from "../api/apiSlice";

const budgetApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: ({ page, search, filter }) => {
        return {
          url: `/budget?page=${page}&search=${search}&filter=${filter}`,
          method: "GET",
        };
      },
      providesTags: ["budgets"],
      keepUnusedDataFor: 3600,
    }),
    addBudget: builder.mutation({
      query: (data) => ({
        url: "/budget/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["budgets"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.result?._id) {
            // Update profile cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("profile", undefined, (draft) => {
                const data = response.data.result;

                draft.result.budgets.push(data);
              })
            );
            // Update profile cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    updateBudget: builder.mutation({
      query: ({ id, data, page, search, filter }) => ({
        url: `/budget/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.result?._id) {
            // Update profile cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("profile", undefined, (draft) => {
                const data = response.data.result;

                draft.result.budgets = draft.result.budgets.map((item) => {
                  if (item._id === data._id) {
                    return data;
                  }
                  return item;
                });
              })
            );
            // Update profile cache pessimistically end

            // Update getBudgets cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getBudgets",
                { page: arg.page, search: arg.search, filter: arg.filter },
                (draft) => {
                  const data = response.data.result;

                  draft.results = draft.results.map((item) => {
                    if (item._id === data._id) {
                      return data;
                    }
                    return item;
                  });
                }
              )
            );
            // Update getBudgets cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    deleteBudget: builder.mutation({
      query: (id) => ({
        url: `/budget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["budgets"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;

          if (response?.data?.result?._id) {
            // Update profile cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData("profile", undefined, (draft) => {
                const data = response.data.result;

                draft.result.budgets = draft.result.budgets.filter(
                  (item) => item._id !== data._id
                );
              })
            );
            // Update profile cache pessimistically end
          }
        } catch (err) {}
      },
    }),
  }),
});

export default budgetApi;
export const {
  useGetBudgetsQuery,
  useAddBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetApi;
