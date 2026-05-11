import baseApi from "@/redux/api/baseApi/baseApi";

export const blogs = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    Allblogs: builder.query({
      query: ({ page = 1, limit = 10 }) => {
        return {
          url: `/blog/all`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: ["blog"],
    }),

    singleBlogs: builder.query({
      query: (id) => ({
        url: `/blog/single/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),

    AllCategoryblogs: builder.query({
      query: () => ({
        url: `/blog/category/blogs`,
        method: "GET",
      }),
      providesTags: ["blog"],
    }),
  }),
});

export const {
  useAllblogsQuery,
  useAllCategoryblogsQuery,
  useSingleBlogsQuery,
} = blogs;
