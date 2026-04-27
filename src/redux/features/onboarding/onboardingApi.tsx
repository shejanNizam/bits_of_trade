import baseApi from "@/redux/api/baseApi/baseApi";

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    completeOnboarding: builder.mutation({
      query: (payload) => ({
        url: "/api/auth/onboarding/complete/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["onboarding", "user"],
    }),
  }),
});

export const { useCompleteOnboardingMutation } = onboardingApi;
