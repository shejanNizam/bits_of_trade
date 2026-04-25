import baseApi from "@/redux/api/baseApi/baseApi";

export const learninghubPublicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLearningHupPublic: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/api/cms/learning-hub/",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["insights"],
    }),
  }),
});

export const { useGetAllLearningHupPublicQuery } = learninghubPublicApi;
