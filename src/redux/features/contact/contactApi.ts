import baseApi from "@/redux/api/baseApi/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (body) => ({
        url: `/contact/create`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useContactMutation } = contactApi;
