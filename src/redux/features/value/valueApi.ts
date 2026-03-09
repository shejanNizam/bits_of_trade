import baseApi from "@/redux/api/baseApi/baseApi";

export const valueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get value
    getValue: builder.query({
      query: (value) => ({
        url: `/value/all/${value}`,
        method: "GET",
      }),
      providesTags: ["value"],
    }),
  }),
});

export const { useGetValueQuery } = valueApi;
