import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// console.log(BASE_URL);

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "auth",
    "onboarding",
    "overview",
    "discipline",
    "discipline-test",
    "user",
    "tradelog",
    "journal",
    "reports",
    "tradeIntelligence",
    "insights",
    "rules",
    "mistake",
    "strategy",
    "settings",
    "notification",
    "unreadCount",
    "notificationSettings",
    "LearningLessons",
    "Courses",
    "Videos",
    "UserCourseProgress",
    "review",
  ],
  endpoints: () => ({}),
});

export default baseApi;
